---
title: PQC Overview
description: Gap analysis and transition overview for adding post-quantum cryptography support to the PIV ecosystem.
---

This page summarizes the principal specification gaps that would need to be addressed to support post-quantum cryptography (PQC) in the PIV environment, with particular focus on ML-DSA for digital signature operations and ML-KEM for key establishment.

The current PIV specifications are structured around classical public-key mechanisms, primarily RSA, ECDSA, and ECDH. As a result, PQC support is not limited to the addition of new algorithms. It is also likely to require coordinated updates to the PIV key model, command semantics, public-key encodings, certificate and data object definitions, and potentially authentication and secure messaging mechanisms.

:::{note}
This overview is intended as a working gap analysis to frame draft development across [SP 800-78](./800-78/SP800-78.md), [SP 800-73 Part 1](./800-73pt1/SP800-73pt1.md), and [SP 800-73 Part 2](./800-73pt2/SP800-73pt2.md). It identifies areas likely to require specification updates; it does not resolve all design questions.
:::

## General Approach

A practical transition approach is expected to require a period in which classical and PQC credentials coexist. A likely design direction is to:

- preserve existing classical PIV key references and data objects,
- add new key references for PQC credentials,
- add new certificate and data object containers for PQC credentials, and
- extend existing commands rather than introduce an entirely separate command model.

This dual-stack approach supports backward compatibility while enabling incremental deployment of PQC-capable cards, middleware, and relying systems.

## Principal Gap Areas

### 1. Cryptographic Algorithm and Key Type Definitions

The PIV algorithm profiles in [SP 800-78](./800-78/SP800-78.md) currently define approved key types, key sizes, object identifiers, algorithm identifiers, and validation requirements for classical algorithms only. PQC support would require:

- approval of PQC algorithms for applicable PIV key types,
- identifiers for ML-DSA and ML-KEM parameter sets,
- public-key and signature object identifiers,
- key reference mappings and valid key-reference and algorithm combinations, and
- associated validation requirements.

### 2. Command Semantics and APDU Interfaces

The command set in [SP 800-73 Part 2](./800-73pt2/SP800-73pt2.md) assumes RSA- and ECC-based operations. PQC support would require updates to:

- `GENERAL AUTHENTICATE` for ML-DSA signature generation and ML-KEM decapsulation,
- `GENERATE ASYMMETRIC KEY PAIR` for PQC key generation and public-key return formats,
- algorithm discovery mechanisms, and
- related command templates and response structures.

Additional changes may be required if PQC support is extended to secure messaging.

### 3. Public Key Formats and Key Generation Outputs

Current key-generation response formats are specific to RSA and elliptic curve keys. PQC support would require new encodings for PQC public keys, likely using a more general public-key representation rather than structures specific to modulus and exponent pairs or elliptic curve points.

### 4. PIV Data Objects and Containers

The PIV data model in [SP 800-73 Part 1](./800-73pt1/SP800-73pt1.md) defines containers and object identifiers for existing certificate types and related objects. PQC support would require:

- new data objects and certificate containers for PQC credentials,
- corresponding BER-TLV tags, object identifiers, and `ContainerID` values,
- access control rules for the new objects, and
- updates to key history or retired key handling, as needed.

### 5. Certificate and Signed-Object Profiles

PIV credentials and several PIV data objects rely on X.509 and CMS structures that currently assume classical signature and public-key algorithms. PQC support would require updates to permit ML-DSA signatures and ML-KEM public keys in certificates and, where applicable, in signed PIV data objects.

### 6. Authentication and Key Establishment Mechanisms

The current PIV authentication model is based on classical challenge-response signature verification and classical key-management mechanisms. PQC support would require definition of corresponding mechanisms for:

- PQC-based authentication using ML-DSA,
- PQC-based key establishment using ML-KEM, and
- card authentication mechanisms based on PQC, if that functionality is determined to be in scope.

### 7. Secure Messaging

Current secure messaging mechanisms are based on ECC and related certificate structures. If PQC support is extended to secure messaging, substantial additional specification work would be required in both [SP 800-73 Part 2](./800-73pt2/SP800-73pt2.md) and related certificate and signer object definitions in [SP 800-73 Part 1](./800-73pt1/SP800-73pt1.md). This area may be addressed separately from initial support for PQC credentials and cryptographic operations.

## Primary Specification Changes


### [SP 800-73 Part 1](./800-73pt1/SP800-73pt1.md)

- PIV containers and data objects,
- object identifiers and BER-TLV tags,
- key references and mechanism identifiers,
- certificate container definitions, and
- authentication and discovery guidance.

### [SP 800-73 Part 2](./800-73pt2/SP800-73pt2.md)

- command semantics,
- authentication templates,
- key-generation command behavior,
- public-key return encodings, and
- secure messaging protocol definitions.

### [SP 800-78](./800-78/SP800-78.md)

- approved algorithms and key types,
- algorithm identifiers and object identifiers,
- key references and allowed combinations, and
- validation requirements.


## PQC Migration for Derived PIV Credentials

[SP 800-157r1](https://doi.org/10.6028/NIST.SP.800-157r1.fpd) specifies derived PIV credentials — additional cryptographic authenticators that are issued to a PIV cardholder and bound to their PIV identity account. Derived PIV credentials extend PIV authentication beyond the PIV Card, accommodating both PKI-based credentials and non-PKI phishing-resistant authenticators such as those supporting WebAuthn and FIDO standards. Derived PIV credentials are issued based on the same identity proofing process as the PIV Card and are managed centrally alongside the cardholder's other PIV credentials.

SP 800-157r1 will need to be updated to permit and reference PQC-capable authenticators and certificates. However, the integration of PQC into the cryptographic authenticators, authentication protocols, certificate profiles, and network security protocols used by derived PIV credentials will primarily be addressed in the base standards and profiles for those mechanisms. For PKI-based derived PIV credentials, the cryptographic updates will follow from changes to SP 800-78 and the Federal PKI Common Policy Framework. For non-PKI-based derived PIV credentials, PQC support will depend on the adoption of PQC algorithms in the underlying authenticator and protocol standards (e.g., WebAuthn, FIDO, TLS).

## PQC Migration for Federation

[SP 800-217](https://doi.org/10.6028/NIST.SP.800-217.fpd) provides guidelines for PIV federation — the use of federation protocols to communicate identity attributes and authentication information across organizational boundaries, enabling PIV cardholders to authenticate to relying parties through identity providers that verify PIV credentials and issue federated assertions.

SP 800-217 will need to be updated to accommodate PQC algorithms in its requirements for assertion signing, assertion encryption, bound authenticators, and supporting network security. However, the integration of PQC into federation will primarily be addressed in the base standards and profiles for the federation protocols (e.g., OpenID Connect, SAML), the cryptographic libraries and key management practices used by identity providers and relying parties, and the network security protocols (e.g., TLS) that protect federation transactions.

## Summary

Support for PQC in PIV is expected to require coordinated updates across the PIV algorithm profile, command interface, data model, derived credential guidelines, and federation guidelines. Interoperability will require the coexistence of classical and PQC mechanisms during the migration period, and the specification updates are expected to preserve existing classical structures while adding support for PQC keys and associated data objects.