/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#import <eosiolib/eosio.hpp>
#include "eosnow.hpp"

/**
 *  The init() and apply() methods must have C calling convention so that the blockchain can lookup and
 *  call these methods.
 */
extern "C" {

    struct transfer {
        eosio::name from;
        eosio::name to;
        uint64_t quantity;
    };

    /// The init method
    void init() {
        eosio::print( "Init Eos-now success", "\n" );
    }

    /// The apply method implements the dispatch of events to this contract
    void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
        eosio::print( "Eos-now want to do: ", eosnow::name(code).value, "->", eosnow::name(action).value, "\n" );

        if ( action == N(transfer) ) {
            transfer message = eosnow::utils::current_message<transfer>();
            eosio::print( "Transfer ", message.quantity, " from ", message.from, " to ", message.to, "\n" );
        }
    }

} // extern "C"
