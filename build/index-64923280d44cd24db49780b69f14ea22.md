---
title: PIV Standards and Guidelines
subtitle: Working drafts for post-quantum cryptography
description: Working drafts of proposed post-quantum cryptography updates to NIST PIV standards and guidelines.
site:
  hide_outline: true
  hide_toc: false
  hide_title_block: false
  hide_footer_links: true
---

This repository contains working drafts of proposed updates to the Personal Identity Verification (PIV) specifications, including NIST SP 800-73, Parts 1 and 2, and NIST SP 800-78, to support NIST's [post-quantum cryptography (PQC) standards](https://csrc.nist.gov/projects/post-quantum-cryptography).

These materials are intended to support the development and evaluation of potential specification changes associated with the use of PQC algorithms, including ML-DSA and ML-KEM, in the PIV environment. Topics addressed may include cryptographic algorithm identifiers, key references, key and data object formats, command behavior, certificate and container definitions, and related authentication or secure messaging mechanisms.

:::{important}
We encourage feedback throughout the development process. See [How to Contribute](./contributing.md) for ways to get involved, including joining the public mailing list and participating on GitHub.
:::

+++ {"class": "centered"}
{button}`Open PQC Overview <./pqc-overview.md>`
+++

(draft-documents)=
### Draft Documents

The pages below provide access to the current draft set and the supporting overview page.

::::{grid} 1 1 2 2
:::{card} Scope and expected changes for PQC
:link: ./pqc-overview.md
:header: **Overview**
Overview of expected PQC-related changes, rationale, and implementation themes across the draft set.
:::

:::{card} Namespace, data model, and representation
:link: ./800-73pt1/SP800-73pt1.md
:header: **SP 800-73 Part 1**
Draft updates to the PIV Card Application Namespace, Data Model, and Representation, including identifiers, object structure, and related data definitions.
:::

:::{card} Card command interface
:link: ./800-73pt2/SP800-73pt2.md
:header: **SP 800-73 Part 2**
Draft updates to the PIV Card Application Card Command Interface, including command behavior, object access, and protocol changes needed to support PQC.
:::

:::{card} Algorithms and key sizes
:link: ./800-78/SP800-78.md
:header: **SP 800-78**
Draft updates to cryptographic algorithms and key sizes for PIV, including PQC algorithm identifiers and related implementation guidance.
:::
::::

The contents of this repository are preliminary working materials provided to facilitate technical discussion and draft development.