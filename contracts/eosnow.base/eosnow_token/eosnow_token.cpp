#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>

#include <string.h>
#include <vector>
#import <eosnow_token.hpp>
#include "eosnow_token.hpp"

using namespace eosio;

void token::init( asset maximum_supply ) {
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );

    STATUS.maximum_supply = maximum_supply;
    STATUS.symbol = sym.name();

    Account issuer;

    issuer.name = _self;
    issuer.activeBalance = maximum_supply;
    issuer.freezeBalance = asset{0, sym};
    issuer.rating = 0;

    accounts[_self] = issuer;
    STATUS.issuer = issuer;
}

bool token::find( account_name name ) {
    std::map<account_name, Account>::iterator iter;
    iter = accounts.find(1);

    if( iter == accounts.end() ) {
        return false;
    } else {
        return true;
    }
}

void token::generate( account_name name ) {
    if( find( name ) == false ) {
        Account account;
        account.activeBalance = asset{0, STATUS.maximum_supply.symbol};
        account.freezeBalance = asset{0, STATUS.maximum_supply.symbol};
        account.name = name;
        account.rating = 0;

        accounts[name] = account;
    } else {
        eosio_assert(false, " user already exists! ");
    }
}

void token::issue( account_name to, asset quantity ) {
    auto sym = quantity.symbol.name();

    require_auth( STATUS.issuer.name );

    eosio_assert( quantity.symbol.name() == STATUS.symbol, "invalid symbols" );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must issue positive quantity" );
    eosio_assert( STATUS.issuer.activeBalance.amount >= quantity.amount, "invalid quantity" );
    eosio_assert( find( to ), "account can't found!" );

    std::printf("execute here");

    STATUS.issuer.activeBalance.amount -= quantity.amount;
    std::map<account_name, Account>::const_iterator value = accounts.find(to);
    Account account = value->second;

    account.activeBalance.amount += quantity.amount;
    accounts[to] = account;
}

void token::transfer( account_name from, account_name to, asset price ) {

}

EOSIO_ABI( token, (init)(generate)(issue)(transfer) )