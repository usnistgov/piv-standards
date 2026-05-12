---
title: How to Contribute
description: How to provide feedback on PIV standards working drafts, join the mailing list, and build the documentation locally.
---

## Providing Feedback

The documents on this site are **working drafts** of updates to NIST's Personal Identity Verification (PIV) standards and guidelines. We welcome feedback throughout the development process and encourage reviewers to share comments, suggestions, and corrections at any stage.

There are several ways to contribute:

### Mailing List

Join the public mailing list to discuss the PIV standards development:

- **List address:** [piv-standards@list.nist.gov](mailto:piv-standards@list.nist.gov)
- **Subscribe:** Send an email to [piv-standards+subscribe@list.nist.gov](mailto:piv-standards+subscribe@list.nist.gov)
- **Archive:** [Browse past messages](https://groups.google.com/a/list.nist.gov/g/piv-standards)

### GitHub

You can file issues, comment on existing issues, or submit pull requests on the project's GitHub repository:

- <https://github.com/usnistgov/piv-standards>

## Building the Documentation

The documents on this site are written in [MyST Markdown](https://mystmd.org/guide), using an extended syntax to support the formatting requirements of NIST publications. Because of these extensions, a forked version of the MyST toolchain is required to build the site locally.

### Dependancies

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

2. **Create a local `myst` command** that points to the built CLI:

   ```bash
   # From the mystmd directory:
   alias myst="node $(pwd)/packages/mystmd/dist/myst.cjs"
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
