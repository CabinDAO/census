// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @notice Functions to be implemented by a keyPurchaseHook.
 * @dev Lock hooks are configured by calling `setEventHooks` on the lock.
 */
interface ILockKeyPurchaseHook {
    /**
     * @notice Used to determine the purchase price before issueing a transaction.
     * This allows the hook to offer a discount on purchases.
     * This may revert to prevent a purchase.
     * @param from the msg.sender making the purchase
     * @param recipient the account which will be granted a key
     * @param referrer the account which referred this key sale
     * @param data arbitrary data populated by the front-end which initiated the sale
     * @return minKeyPrice the minimum value/price required to purchase a key with these settings
     * @dev the lock's address is the `msg.sender` when this function is called via
     * the lock's `purchasePriceFor` function
     */
    function keyPurchasePrice(address from, address recipient, address referrer, bytes calldata data)
        external
        view
        returns (uint256 minKeyPrice);

    /**
     * @notice If the lock owner has registered an implementer then this hook
     * is called with every key sold.
     * @param tokenId the id of the purchased key
     * @param from the msg.sender making the purchase
     * @param recipient the account which will be granted a key
     * @param referrer the account which referred this key sale
     * @param data arbitrary data populated by the front-end which initiated the sale
     * @param minKeyPrice the price including any discount granted from calling this
     * hook's `keyPurchasePrice` function
     * @param pricePaid the value/pricePaid included with the purchase transaction
     * @dev the lock's address is the `msg.sender` when this function is called
     */
    function onKeyPurchase(
        uint256 tokenId,
        address from,
        address recipient,
        address referrer,
        bytes calldata data,
        uint256 minKeyPrice,
        uint256 pricePaid
    ) external;
}
