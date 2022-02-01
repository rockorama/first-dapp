//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Greeter {
  string private greeting;
  string private name;

  constructor(string memory _greeting) {
    console.log('Deploying a Greeter with greeting:', _greeting);
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }

  function getName() public view returns (string memory) {
    return name;
  }

  function setName(string memory _name) public {
    console.log("Changing name from '%s' to '%s'", name, _name);
    name = _name;
  }
}
