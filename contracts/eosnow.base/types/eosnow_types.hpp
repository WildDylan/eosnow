//
// Created by dylan on 2018/4/2.
//

#pragma once
#include <eosiolib/eosio.hpp>

namespace eosnow {

    struct name : eosio::name {
        name(int value) {
            this->value = value;
        }
    };

}
