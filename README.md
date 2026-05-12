# PIV Standards and Guidelines — PQC Working Drafts

This repository contains working drafts of proposed updates to the Personal Identity Verification (PIV) specifications to support NIST's [post-quantum cryptography (PQC) standards](https://csrc.nist.gov/projects/post-quantum-cryptography).

**View the working drafts at: <https://pages.nist.gov/piv-standards>**

## Draft Documents

- **SP 800-73 Part 1** — PIV Card Application Namespace, Data Model, and Representation
- **SP 800-73 Part 2** — PIV Card Application Card Command Interface
- **SP 800-78** — Cryptographic Algorithms and Key Sizes for PIV

These materials are intended to support the development and evaluation of potential specification changes associated with the use of PQC algorithms, including ML-DSA and ML-KEM, in the PIV environment. Topics addressed may include cryptographic algorithm identifiers, key references, key and data object formats, command behavior, certificate and container definitions, and related authentication or secure messaging mechanisms.

The contents of this repository are preliminary working materials provided to facilitate technical discussion and draft development.

## How to Contribute

We welcome feedback throughout the development process.

### Mailing List

Join the public mailing list to discuss the PIV standards development:

- **List address:** [piv-standards@list.nist.gov](mailto:piv-standards@list.nist.gov)
- **Subscribe:** Send an email to [piv-standards+subscribe@list.nist.gov](mailto:piv-standards+subscribe@list.nist.gov)
- **Archive:** [Browse past messages](https://groups.google.com/a/list.nist.gov/g/piv-standards)

### GitHub

You can file issues, comment on existing issues, or submit pull requests:

- <https://github.com/usnistgov/piv-standards>

## Building the Documentation

The documents are written in [MyST Markdown](https://mystmd.org/guide), using an extended syntax to support NIST publication formatting. A forked version of the MyST toolchain is required to build the site locally.

### Dependencies

- [Node.js](https://nodejs.org/) (v22 or later recommended)
- [Bun](https://bun.sh/) (used to build the MyST toolchain)
- [Git](https://git-scm.com/)
- [ImageMagick](https://imagemagick.org/), [webp](https://developers.google.com/speed/webp/), and [Ghostscript](https://www.ghostscript.com/) for image and PDF processing

### Build Instructions

1. **Clone and build the forked MyST toolchain:**

   ```bash
   git clone https://github.com/regenscheid/mystmd.git
   cd mystmd
   bun install
   bun run build
   ```

2. **Create a local `myst` command** that points to the built CLI. For a quick one-shot session you can use a shell alias, but for repeated use consider installing a wrapper script so the command persists across shells:

   ```bash
   # Quick alias (current shell only), from the mystmd directory:
   alias myst="node $(pwd)/packages/mystmd/dist/myst.cjs"

   # Or install a persistent wrapper (run from the mystmd directory):
   sudo bash -c "printf '#!/bin/sh\nnode \"$(pwd)/packages/mystmd/dist/myst.cjs\" \"\$@\"\n' > /usr/local/bin/myst"
   sudo chmod +x /usr/local/bin/myst
   ```

3. **Clone the PIV standards repository and install dependencies:**

   ```bash
   git clone https://github.com/usnistgov/piv-standards.git
   cd piv-standards
   npm install
   ```

4. **Start the local development server:**

   ```bash
   myst start
   ```

   This will build the site and open a local preview in your browser.
