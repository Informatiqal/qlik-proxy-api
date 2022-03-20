# Changelog

All notable changes to this project will be documented in this file.

## [1.1.7] - 2022-03-20

- dependency update

### Fixed

## [1.1.5-6] - 2022-03-09

### Fixed

- `sessions.get` populates `details`. The request was returning the details but they were not populated inside the `Session` instance
- `session.get` - if no virtual proxy property is provided then the default virtual proxy will be used (`virtualProxy = ""`)
- `session.getAll` - all arguments are optional. If no arguments are provided, all sessions for the main virtual proxy will be returned (`virtualProxy = ""`)
- `IHttpReturn` is exposed from `qlik-rest-api` instead of documentation package

## [1.1.4] - 2021-11-09

### Added

- (almost) all methods are documented in `JSDoc` format. This will appear in IDE's Intellisense
- WiKi sections is added

### Fix

- `Attributes` property, inside interfaces, is now defined with the correct type (instead of `string[]`)

### Changed

- **BREAKING** all methods arguments are now passed as `Object` instead of named parameters
- **BREAKING** methods, that are returning read-only data, are returning data in format of `qlik-rest-api` (`{ data: [], status: 200, statusText: "OK" }`)
- `README` is updated. The other methods are returning and instance of an object (like `Session`)
- tests were changed to reflect the argument changes
