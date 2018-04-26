//
// Created by dylan on 2018/4/26.
//

#include "eosnow.hpp"
#include <time.h>

uint64_t eosnow::id = 1000;

void eosnow::create(account_name creator, string title, string description, string content, asset price) {
    require_auth(creator);

    nows now_table(_self, _self);

    config conf;
    get_config(conf);

    uint64_t id = conf.id ++;

    now_table.emplace( creator, [&]( auto& i_now ) {
        i_now.id = id;
        i_now.owner = creator;

        i_now.title = title;
        i_now.description = description;
        i_now.content = content;
        i_now.score = 5; // initialized score was 0
        i_now.score_count = 1;

        i_now.price = price;
    });

    store_config(conf);
}

void eosnow::give(account_name to, uint64_t id ) {
    // While our currency trade success
    nows now_table(_self, _self);

    auto it = now_table.find( id );
    eosio_assert( it != now_table.end(), "`now` with the id not found" );

    require_auth(it->owner);

    now_table.modify(now_table.get( id ), 0, [&]( auto& m_now ) {
        m_now.prev_owner = m_now.owner;
        m_now.owner = to;
    });

    print("Buy success!");
}

void eosnow::remove( uint64_t id ) {
    nows now_table(_self, _self);

    auto it = now_table.find( id );
    eosio_assert( it != now_table.end(), "`now` with the id not found" );

    require_auth(it->owner);
    now_table.erase(it);
}

void eosnow::score( account_name rater, uint64_t id, uint64_t score ) {
    nows now_table(_self, _self);
    require_auth(rater);

    eosio_assert( score <= 5, "`score` must in range 0 ~ 5" );

    auto it = now_table.find( id );
    eosio_assert( it != now_table.end(), "`now` with the id not found" );

    now_table.modify(now_table.get( id ), 0, [&]( auto& m_now ) {
        m_now.score_count += 1;
        m_now.score += score;
    });

    print("Rate success!");
}
