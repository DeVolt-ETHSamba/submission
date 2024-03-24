<div align="center">
    <img src="https://github.com/Mugen-Builders/.github/assets/153661799/7ed08d4c-89f4-4bde-a635-0b332affbd5d" width="150" height="150">
</div>
<br>
<div align="center">
    <i>An Typescript example using Sunodo/Nonodo and Deroll, a High-Level Framework</i>
</div>
<div align="center">
This example aims to demonstrate the lifecycle of a DApp using Deroll.
</div>
<br>
<div align="center">
    
  <a href="">[![Static Badge](https://img.shields.io/badge/cartesi--rollups-1.0.0-5bd1d7)](https://docs.cartesi.io/cartesi-rollups/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/sunodo-0.10.4-blue)](https://docs.sunodo.io/guide/introduction/what-is-sunodo)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/nonodo-0.1.0-blue)](https://github.com/gligneul/nonodo/releases/tag/v0.1.0)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/@deroll/app-0.5.0-yellow)](https://www.npmjs.com/package/@deroll/app)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/@deroll/router-0.2.4-yellow)](https://www.npmjs.com/package/@deroll/router)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/@deroll/wallet-0.3.7-yellow)](https://www.npmjs.com/package/@deroll/wallet)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/foundry-0.2.0-red)](https://book.getfoundry.sh/getting-started/installation)</a>
</div>

## User Stories:

Here is a list of user stories that the application covers:
Here's the corrected version:

| #   | User Story Description                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------- |
| 1   | As a sensor of the system, I want to send a battery report (this user story creates a station if it does not exist).                                           |
| 2   | As a producer of energy, I want to place a bid to earn the right to sell my energy at one of the stations.                                       |
| 3   | As an energy consumer, I want to buy energy at a station to recharge, for example, my vehicle.         |
| 4   | As a producer of energy, I want to recharge the station that wins an auction to exchange my tokens. |

## Setup:

### Requirements

Please refer to the [rollups-examples requirements](https://github.com/cartesi/rollups-examples/tree/main/README.md#requirements). 

- To run using Sunodo. install the [package](https://github.com/sunodo/sunodo)
- To run using Nonodo, install the [binary](https://github.com/gligneul/nonodo)

### Building:

```shell
sunodo build
```

### Running:

```shell
sunodo run --epoch-duration 60
```

### Running using Nonodo:

```shell
npm i
nonodo -- npm start
