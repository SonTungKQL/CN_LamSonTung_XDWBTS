/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     11/27/2024 5:41:42 PM                        */
/*==============================================================*/



/*==============================================================*/
/* Table: BLOGS                                                 */
/*==============================================================*/
create table BLOGS
(
   BLOG_ID_             int not null  comment '',
   BLOG_TITLE           varchar(255)  comment '',
   BLOG_CONTENT         varchar(255)  comment '',
   BLOG_IMAGE_URL       varchar(255)  comment '',
   BLOG_AUTHOR          varchar(255)  comment '',
   CREATED_AT           varchar(255)  comment '',
   BLOG_STAUS           varchar(255)  comment '',
   primary key (BLOG_ID_)
);

/*==============================================================*/
/* Table: CART                                                  */
/*==============================================================*/
create table CART
(
   CART_ID              int not null  comment '',
   USER_ID              int not null  comment '',
   PRODUCT_ID           int not null  comment '',
   primary key (CART_ID)
);

/*==============================================================*/
/* Table: CATEGORIES                                            */
/*==============================================================*/
create table CATEGORIES
(
   CATEGORY_ID_         int not null  comment '',
   CATEGORY_NAME        varchar(255)  comment '',
   CATEGORY_DECRIPTION  varchar(255)  comment '',
   primary key (CATEGORY_ID_)
);

/*==============================================================*/
/* Table: ORDERDETAILS                                          */
/*==============================================================*/
create table ORDERDETAILS
(
   ORDER_DETAIL_ID      int not null  comment '',
   ORDER_ID_            int not null  comment '',
   PRODUCT_ID           int not null  comment '',
   QUANTITY             int  comment '',
   PRICE                float  comment '',
   primary key (ORDER_DETAIL_ID)
);

/*==============================================================*/
/* Table: ORDERS                                                */
/*==============================================================*/
create table ORDERS
(
   ORDER_ID_            int not null  comment '',
   USER_ID              int not null  comment '',
   ORDER_STATUS_        varchar(255)  comment '',
   TOTAL_PRICE_         varchar(255)  comment '',
   PAYMENT_METHOD_      varchar(255)  comment '',
   CREATED_AT_          datetime  comment '',
   UPDATED_AT_          datetime  comment '',
   LOCATION_ODER        varchar(255)  comment '',
   PHONE_ODER           varchar(255)  comment '',
   primary key (ORDER_ID_)
);

/*==============================================================*/
/* Table: PRODUCTS                                              */
/*==============================================================*/
create table PRODUCTS
(
   PRODUCT_ID           int not null  comment '',
   CATEGORY_ID_         int not null  comment '',
   NAME                 varchar(255)  comment '',
   PRODUCT_PRICE        varchar(255)  comment '',
   MATERIAL_            varchar(255)  comment '',
   WEIGHT               varchar(255)  comment '',
   SIZE_                varchar(255)  comment '',
   IMAGE_URL_           varchar(255)  comment '',
   STOCK_QUANTITY_      varchar(255)  comment '',
   CREATED_AT_          datetime  comment '',
   UPDATED_AT           datetime  comment '',
   primary key (PRODUCT_ID)
);

/*==============================================================*/
/* Table: PROMOTIONS                                            */
/*==============================================================*/
create table PROMOTIONS
(
   PROMOTION_ID_        int not null  comment '',
   PROMOTION_TITLE_     varchar(255)  comment '',
   PRODUCT_ID           int not null  comment '',
   PROMOTION__DECRIPTION text  comment '',
   PROMOTION_DISCOUNT   float  comment '',
   PROMOTION_START_DATE datetime  comment '',
   PROMOTION_END_DATE   datetime  comment '',
   primary key (PROMOTION_ID_)
);

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS
(
   USER_ID              int not null  comment '',
   USERNAME             varchar(255)  comment '',
   PASSWORD             varchar(255)  comment '',
   EMAIL                varchar(255)  comment '',
   PHONE                varchar(255)  comment '',
   ADDRESS_             varchar(255)  comment '',
   CREATED_AT           varchar(255)  comment '',
   UPDATED_AT           datetime  comment '',
   USER_STATUS          varchar(255)  comment '',
   AVATAR_USER          varchar(255)  comment '',
   primary key (USER_ID)
);

/*==============================================================*/
/* Table: WISHLIST                                              */
/*==============================================================*/
create table WISHLIST
(
   WISHLIST_ID          int not null  comment '',
   USER_ID              int not null  comment '',
   PRODUCT_ID           int not null  comment '',
   primary key (WISHLIST_ID)
);

alter table CART add constraint FK_CART_CO_USERS foreign key (USER_ID)
      references USERS (USER_ID) on delete restrict on update restrict;

alter table CART add constraint FK_CART_DUOC_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID) on delete restrict on update restrict;

alter table ORDERDETAILS add constraint FK_ORDERDET_CO_O_ORDERS foreign key (ORDER_ID_)
      references ORDERS (ORDER_ID_) on delete restrict on update restrict;

alter table ORDERDETAILS add constraint FK_ORDERDET_DUOC_ODER_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID) on delete restrict on update restrict;

alter table ORDERS add constraint FK_ORDERS_MUA_USERS foreign key (USER_ID)
      references USERS (USER_ID) on delete restrict on update restrict;

alter table PRODUCTS add constraint FK_PRODUCTS_THUOC_CATEGORI foreign key (CATEGORY_ID_)
      references CATEGORIES (CATEGORY_ID_) on delete restrict on update restrict;

alter table PROMOTIONS add constraint FK_PROMOTIO_DUOC_GIAM_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID) on delete restrict on update restrict;

alter table WISHLIST add constraint FK_WISHLIST_CO_W_USERS foreign key (USER_ID)
      references USERS (USER_ID) on delete restrict on update restrict;

alter table WISHLIST add constraint FK_WISHLIST_DUOC_W_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID) on delete restrict on update restrict;

