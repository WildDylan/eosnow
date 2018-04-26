//
// Created by dylan on 2018/4/26.
//

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;
using namespace std;

class eosnow: public eosio::contract {
    using contract::contract;

public:
    eosnow( account_name self ) : contract ( self ) {}

    /// @abi action
    void create( account_name owner, string title, string description, string content, asset price );

    /// @abi action
    void give( account_name to, uint64_t id );

    /// @abi action
    void remove( uint64_t id );

    /// @abi action
    void score( account_name rater, uint64_t id, uint64_t score );

    /// @abi action
    void price( uint64_t id, asset price );

private:
    static uint64_t id;

    struct config {
        config () {}

        constexpr static uint64_t key = N(config);
        uint64_t id = 1000;
    };

    void store_config(const config &conf) {
        auto it = db_find_i64( _self, _self, N(config), config::key );
        if ( it != -1 ) {
            db_update_i64( it, _self, (const char *)&conf, sizeof(config) );
        } else {
            db_store_i64( _self, N(config), _self, config::key, (const char *)&conf, sizeof(config) );
        }
    }

    bool get_config( config &conf ) {
        auto it = db_find_i64( _self, _self, N(config), config::key );
        if ( it != -1 ) {
            auto size = db_get_i64( it, (char*)&conf, sizeof(config) );
            eosio_assert( size == sizeof(config), "Wrong record size" );
            return true;
        }
        return false;
    }

    /// @abi table
    struct now {
        uint64_t id;

        string title;
        string description;
        string content;

        account_name prev_owner;
        account_name owner;

        asset price;
        uint64_t score;
        uint64_t score_count;

        uint64_t primary_key() const { return id; }
    };

    /// nows list
    typedef multi_index<N(now), now> nows;
};

EOSIO_ABI(eosnow, (create)(give)(remove)(score)(price))
