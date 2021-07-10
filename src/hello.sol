pragma ton-solidity >= 0.43.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

contract Hello {
    uint256 public _hello;

    constructor(uint256 count) public {
        tvm.accept();
        _hello = count;
    }

    function getHello() public view returns(uint256 hello) {
        hello = _hello;
    }

    function setHello(uint256 count) public {
        tvm.accept();
        _hello += count;
    }

}