//
// Created by dylan on 2018/4/16.
//

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <string>

using namespace eosio;
using std::string;

class token : public contract {
public:
    enum orderStatus {
        WAIT_PAY = 0,
        WAIT_SEND_PRODUCT = 1,
        WAIT_CONFIRM = 2,

        REFUND = 3,
        WAIT_REFUND_CONFIRM = 4,

        COMPLETE = 5,
        RATING_COMPLETE = 6
    };

    struct Account {
        asset activeBalance;
        asset freezeBalance;

        account_name name;
        uint64_t rating;
    };

    struct Product {
        asset originPrice;
        asset discountedPrice;

        std::string description;
        Account owner;
    };

    struct Order {
        Product product;
        asset price;
        orderStatus state;
        Account buyer;
        Account seller;
        std::string remark;
    };

    struct ContractStatus {
        // maximum_supply
        asset        maximum_supply;
        uint64_t     symbol;
        Account issuer;
    };

    ContractStatus STATUS;

    std::map<account_name, Account> accounts;
    std::vector<Product> products;
    std::vector<Order> orders;

    typedef eosio::multi_index<N(accounts), Account> accs;

    token( account_name self ):contract(self){}

    /// @abi action
    void init( asset maximum_supply );

    /// @abi action
    bool find( account_name name );

    /// @abi action
    void generate( account_name name );

    /// @abi action
    void issue( account_name to, asset quantity );

    /// @abi action
    void transfer( account_name from, account_name to, asset price );
};
