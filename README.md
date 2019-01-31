<p align="center">
  <img src="doc/Logo@2x.png?raw=true">
  <p align="center">Single API for resolving Solidity artefacts and imports</p>

  <p align="center">
    <a href="https://t.me/resolverengine"><img alt="Chat on telegram" src="https://img.shields.io/badge/chat-on%20telegram-blue.svg" /></a>
    <a href="https://circleci.com/gh/Crypto-Punkers/resolver-engine/tree/master"><img alt="Build status" src="https://img.shields.io/circleci/project/github/Crypto-Punkers/resolver-engine/master.svg" /></a>
  </p>
</p>

## Usage

We provide a pre-built complete engine with sane defaults.

```typescript
import { ImportFsEngine } from "@resolver-engine/import-fs";

ImportFsEngine()
  .require("github:OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol#v2.1.2")
  .then(file => console.log(`Loaded url ${file.url} with source: ${file.source}`);
```

Otherwise, you can build your own engines

```typescript
import { ResolverEngine, NodeResolver, FsResolver, FsParser } from "resolver-engine";

const resolver = new ResolverEngine<string>()
  .addResolver(FsResolver("contracts/"))
  .addResolver(NodeResolver())
  .addParser(FsParser());

resolver
  .resolve("@openzeppelin-solidity/contracts/ownership/Ownable.sol")
  .then(fileSource => console.log(fileSource))
  .catch(console.error);
```

In the [`examples/` folder](examples/) more granular examples can be found

## Why

Each Solidity framework has different logic concerning Solidity import statements as well as creating different format of artifacts. This becomes problematic when target developers want to use multiple tools on the same codebase.

For example, Truffle artifacts are not compatible with 0xProject's solidity coverage tooling. Documentation generation doesn't support NPM-like Solidity imports which are supported by both Truffle and 0x, at the same time, neither of which support github import statements as the ones Remix does.

The goal of this library is to provide tooling for framework developers so that they can implement multiple artifacts and solidity importing with ease, as well as providing sane defaults that would standarize the functionallity.

<p align="center">
  <img src="doc/SequenceRender.png?raw=true">
</p>
