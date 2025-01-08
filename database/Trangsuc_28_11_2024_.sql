/*==============================================================*/
/* Table: BLOGS                                                 */
/*==============================================================*/
create table BLOGS
(
   BLOG_ID_             int not null auto_increment comment 'ID của blog',
   BLOG_TITLE           varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tiêu đề blog',
   BLOG_CONTENT         varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Nội dung blog',
   BLOG_IMAGE_URL       varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'URL ảnh của blog',
   BLOG_AUTHOR          varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tác giả blog',
   CREATED_AT           varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Thời gian tạo',
   BLOG_STAUS           varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Trạng thái blog',
   primary key (BLOG_ID_)
);

/*==============================================================*/
/* Table: CART                                                  */
/*==============================================================*/
create table CART
(
   CART_ID              int not null auto_increment comment 'ID giỏ hàng',
   USER_ID              int not null comment 'ID người dùng',
   PRODUCT_ID           int not null comment 'ID sản phẩm',
   primary key (CART_ID)
);

/*==============================================================*/
/* Table: CATEGORIES                                            */
/*==============================================================*/
create table CATEGORIES
(
   CATEGORY_ID_         int not null auto_increment comment 'ID danh mục',
   CATEGORY_NAME        varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tên danh mục',
   CATEGORY_DECRIPTION  varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Mô tả danh mục',
   CATEGORY_STATUS      int comment 'Trạng thái danh mục',
   primary key (CATEGORY_ID_)
);

/*==============================================================*/
/* Table: ORDERDETAILS                                          */
/*==============================================================*/
create table ORDERDETAILS
(
   ORDER_DETAIL_ID      int not null auto_increment comment 'ID chi tiết đơn hàng',
   ORDER_ID_            int not null comment 'ID đơn hàng',
   PRODUCT_ID           int not null comment 'ID sản phẩm',
   QUANTITY             int comment 'Số lượng sản phẩm',
   PRICE                float comment 'Giá sản phẩm',
   DISCOUNT_PRODUCT     float comment 'Chiết khấu sản phẩm',
   primary key (ORDER_DETAIL_ID)
);

/*==============================================================*/
/* Table: ORDERS                                                */
/*==============================================================*/
create table ORDERS
(
   ORDER_ID_            int not null auto_increment comment 'ID đơn hàng',
   USER_ID              int not null comment 'ID người dùng',
   ORDER_STATUS_        varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Trạng thái đơn hàng',
   TOTAL_PRICE_         varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tổng giá trị đơn hàng',
   PAYMENT_METHOD_      varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Phương thức thanh toán',
   CREATED_AT_          datetime comment 'Ngày tạo đơn hàng',
   UPDATED_AT_          datetime comment 'Ngày cập nhật đơn hàng',
   ADDRESS_ODER         varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Địa chỉ giao hàng',
   PHONE_ODER           varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Số điện thoại giao hàng',
   primary key (ORDER_ID_)
);

/*==============================================================*/
/* Table: PRODUCTS                                              */
/*==============================================================*/
create table PRODUCTS
(
   PRODUCT_ID           int not null auto_increment comment 'ID sản phẩm',
   CATEGORY_ID_         int not null comment 'ID danh mục',
   NAME                 varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tên sản phẩm',
   PRODUCT_PRICE        varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Giá sản phẩm',
   MATERIAL_            varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Chất liệu sản phẩm',
   WEIGHT               varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Trọng lượng sản phẩm',
   SIZE_                varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Kích thước sản phẩm',
   IMAGE_URL_           varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'URL ảnh sản phẩm',
   STOCK_QUANTITY_      varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Số lượng tồn kho',
   CREATED_AT_          datetime comment 'Ngày tạo sản phẩm',
   UPDATED_AT           datetime comment 'Ngày cập nhật sản phẩm',
   PRODUCT_STATUS       int comment 'Trạng thái sản phẩm',
   primary key (PRODUCT_ID)
);

/*==============================================================*/
/* Table: PROMOTIONS                                            */
/*==============================================================*/
create table PROMOTIONS
(
   PROMOTION_ID_        int not null auto_increment comment 'ID khuyến mãi',
   PRODUCT_ID           int not null comment 'ID sản phẩm',
   PROMOTION_TITLE_     varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tiêu đề khuyến mãi',
   PROMOTION__DECRIPTION text character set utf8mb4 collate utf8mb4_unicode_ci comment 'Mô tả khuyến mãi',
   PROMOTION_DISCOUNT   float comment 'Giảm giá khuyến mãi',
   PROMOTION_START_DATE datetime comment 'Ngày bắt đầu khuyến mãi',
   PROMOTION_END_DATE   datetime comment 'Ngày kết thúc khuyến mãi',
   primary key (PROMOTION_ID_)
);

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS
(
   USER_ID              int not null auto_increment comment 'ID người dùng',
   USERNAME             varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Tên người dùng',
   PASSWORD             varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Mật khẩu người dùng',
   EMAIL                varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Email người dùng',
   PHONE                varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Số điện thoại người dùng',
   ADDRESS_             varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Địa chỉ người dùng',
   CREATED_AT           varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Thời gian tạo tài khoản',
   UPDATED_AT           datetime comment 'Thời gian cập nhật tài khoản',
   USER_STATUS          varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Trạng thái tài khoản',
   AVATAR_USER          varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci comment 'Ảnh đại diện',
   primary key (USER_ID)
);

/*==============================================================*/
/* Table: WISHLIST                                              */
/*==============================================================*/
create table WISHLIST
(
   WISHLIST_ID          int not null auto_increment comment 'ID danh sách yêu thích',
   USER_ID              int not null comment 'ID người dùng',
   PRODUCT_ID           int not null comment 'ID sản phẩm',
   primary key (WISHLIST_ID)
);

/*==============================================================*/
/* Foreign Key Constraints                                       */
/*==============================================================*/
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

alter table PROMOTIONS add constraint FK_PROMOTIO_DUOC_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID) on delete restrict on update restrict;

alter table WISHLIST add constraint FK_WISHLIST_CO_USERS foreign key (USER_ID)
      references USERS (USER_ID) on delete restrict on update restrict;

alter table WISHLIST add constraint FK_WISHLIST_DUOC_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID) on delete restrict on update restrict;
