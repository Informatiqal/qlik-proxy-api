# Changelog

All notable changes to this project will be documented in this file.

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
