# Agent Instructions & Guidelines

## File Sharing

When the user asks to share anything (files, documents, exports, reports, assets, etc.):
- **Shared Directory**: Use `/home/simple/sharedDavid` as the folder to share.
- Place, export, or copy the requested files directly into `/home/simple/sharedDavid/`.
- Ensure files are accessible by the `shared` group. If running shell commands in an environment where GID `shared` is not yet loaded into the current process groups, execute with `newgrp shared` (e.g., `newgrp shared <<< "cp <file> /home/simple/sharedDavid/"`).
