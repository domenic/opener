# Security policy

## Security model

`opener` opens URLs, files, and executables using the operating system's opening mechanism. Running programs is part of its purpose. It trusts the caller's arguments and options, and the execution environment, including executable lookup and file associations.

`opener` is not a sandbox or an input validation library. It does not guarantee that arbitrary input will be treated as a literal URL or filename, or that opening something is safe. Do not rely on it to make untrusted input safe, even when that input is embedded in a URL or supplied in an argument array. Applications are responsible for deciding what may be opened and enforcing their own security boundaries.

The following do not, by themselves, demonstrate a vulnerability in `opener`:

- Opening a malicious executable, file, or URL supplied by the caller.
- Passing untrusted input to `opener` and relying on it to prevent command execution or other unwanted interpretation by the operating system.
- An attacker using `opener` to perform an action they could already perform with the victim's privileges, including after obtaining root access or control of the victim's application code.

Argument handling and escaping bugs can still be correctness bugs worth fixing. Classifying one as a security vulnerability requires a realistic attack within this security model.

## Reporting a vulnerability

Report suspected vulnerabilities through [GitHub's private vulnerability reporting form](https://github.com/domenic/opener/security/advisories/new). Do not open a public issue for a suspected vulnerability. Please coordinate disclosure before publishing details.

Include:

- **Attacker:** what they control, and how they obtain that control.
- **Victim:** whose application, system, or data is affected, and what causes it to encounter the attacker's input.
- **Security boundary:** what the attacker gains that they could not already do, and why preventing it is `opener`'s responsibility under the model above.
- **Reproduction:** a minimal working example, the `opener` and Node.js versions, operating system, and expected and actual results.

A program that runs an attacker-selected command is not sufficient without this context. Scanner output alone is also insufficient: verify that it concerns this npm package, not the unrelated [EIPStackGroup/OpENer](https://github.com/EIPStackGroup/OpENer) project.
