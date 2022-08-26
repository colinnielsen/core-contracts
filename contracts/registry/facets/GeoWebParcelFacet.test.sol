// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "../libraries/LibGeoWebParcel.sol";
import "./GeoWebParcelFacet.sol";

contract TestableGeoWebParcelFacet is GeoWebParcelFacet {
    function build(uint64 baseCoordinate, uint256[] memory path)
        external
        returns (uint256 newParcelId)
    {
        return LibGeoWebParcel.build(baseCoordinate, path);
    }

    function destroy(uint64 id) external {
        return LibGeoWebParcel.destroy(id);
    }
}