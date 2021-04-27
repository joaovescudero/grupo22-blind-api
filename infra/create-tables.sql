create table "user"
(
    id         serial                                 not null
        constraint user_pk
            primary key,
    name       varchar(255)                           not null,
    email      varchar(255)                           not null,
    password   varchar(255)                           not null,
    document   varchar(255)                           not null,
    birthday   date                                   not null,
    mobile     varchar(255)                           not null,
    is_enabled boolean                  default true,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

alter table "user"
    owner to postgres;

create unique index user_email_uindex
    on "user" (email);

create unique index user_id_uindex
    on "user" (id);

create table user_responsible
(
    id         serial                                 not null
        constraint user_responsible_pk
            primary key,
    name       varchar(255),
    email      varchar(255)                           not null,
    mobile     varchar(255)                           not null,
    user_id    integer                                not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);

alter table user_responsible
    owner to postgres;

create unique index user_responsible_email_uindex
    on user_responsible (email);

create unique index user_responsible_id_uindex
    on user_responsible (id);

create index user_responsible_user_id_email_index
    on user_responsible (user_id, email);

grant all on database blind to services;
grant all on all sequences in schema blind.public to services;
grant all on all tables in schema blind.public to services;
