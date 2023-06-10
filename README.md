# Sapphire.js Template

## Getting Started

Clone the repository and install the dependencies using [PnPM](https://pnpm.io/):

```bash
git clone https://github.com/mauriciobraz/sapphire.js-template.git
cd sapphire.js-template
pnpm install
```

### Renaming the Project

**Linux**

```bash
set NAME="my-project"
find . -type f -exec sed -i 's/sapphire.js-template/$NAME/g' {} +
```

**Windows**

```bash
set NAME="my-project"
PowerShell -Command "Get-ChildItem -Recurse | ForEach-Object { if ($_.Name -ne 'rename.ps1') { (Get-Content $_.FullName) -replace 'sapphire.js-template', '%NAME%' | Set-Content $_.FullName } }"
```

### Running the Project

```bash
# Copy the `.env.example` file to `.env` and fill the variables.
pnpm dev
```

## Project Structure

1. **Constants** are any constant value that will be used in the project.
2. **Modules** are any `sapphire.js` module (command, listener, etc.).
3. **Utilities** are any utility function that will be used in the project.
   1. Prefix the file name with `_` if it's not a Sapphire.js utility class.
