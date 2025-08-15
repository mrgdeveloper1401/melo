import {DataTypes, Sequelize} from 'sequelize';

// class User extends Model {}
// class Follow extends Model {}
// class Wallet extends Model {}
// class CartNumber extends Model {}
// class Profile extends Model {}
// class UserNotification extends Model {}


export const CreateUserModel = (sequelize) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.CHAR(64),
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.CHAR(100),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.CHAR(128),
                allowNull: false
            },
            pre_phone: {
                type: DataTypes.CHAR(10),
                allowNull: true
            },
            mobile_phone: {
                type: DataTypes.CHAR(11),
                validate: {
                    is: {
                        args: /^[0-9]{11}$/,
                        mss: "The mobile number must be 11 digits and contain only numbers."
                    }
                }
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            is_staff: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_superuser: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
                
            },
            is_artist: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
    },
    {
        timestamps: false,
    }
    );
    return User
}


// Follow.init(
//     {
//         id: {
//             type: DataTypes.BIGINT,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         from_user_id: {
//             type: DataTypes.BIGINT,
//             allowNull: false
//         },
//         to_user_id: {
//             type: DataTypes.BIGINT,
//             allowNull: false
//         }
//     },
//     {
//         sequelize,
//         modelName: "Follow",
//         tableName: "follows"
//     }
// );

// Wallet.init(
//     {
//         id: {
//             type: DataTypes.BIGINT,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         amount: {
//             type: DataTypes.DECIMAL(15, 3),
//             defaultValue: 0
//         },
//         is_active: {
//             type: DataTypes.BIGINT,
//             defaultValue: true
//         }
//     },
//     {
//         sequelize,
//         modelName: "Wallet",
//         tableName: "wallets"
//     }
// );

// User.associate = (models) => {
//     User.belongsToMany(
//         models.User,
//         {
//             through: models.Follow,
//             as: "following",
//             foreignKey: "from_user_id",
//             otherKey: "to_user_id"
//         }
//     );

//     User.belongsToMany(
//         models.User,
//         {
//             through: models.Follow,
//             as: 'followers',
//             foreignKey: 'to_user_id',
//             otherKey: 'from_user_id'
//         }
//     );

//     User.hasOne(
//         models.Wallet,
//         {
//             foreignKey: "user_id",
//             as: "wallet"
//         }
//     );

//     User.hasOne(
//         models.Profile,
//         {
//             foreignKey: "user_id",
//             as: "profile"
//         }
//     );
// }

// Wallet.associate = (models) => {
//     Wallet.belongsTo(
//         model.User,
//         {
//             foreignKey: "user_id",
//             as: 'user'
//         }
//     );

//     Wallet.hasMany(
//         models.CartNumber,
//         {
//             foreignKey: 'wallet_id',
//             as: 'cart_numbers'
//         }
//     )
// }

// CartNumber.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     cart: {
//       type: DataTypes.CHAR(16),
//       allowNull: false
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true
//     },
//     is_default: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false
//     }
//   },
//   {
//     sequelize,
//     modelName: "CartNumber",
//     tableName: "cart_numbers",
//   }
// );

// CartNumber.associate = (models) => {
//   CartNumber.belongsTo(models.Wallet, {
//     foreignKey: 'wallet_id',
//     as: 'wallet'
//   });
// };

// Profile.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     first_name: {
//       type: DataTypes.CHAR(255)
//     },
//     last_name: {
//       type: DataTypes.CHAR(255)
//     },
//     birth_date: {
//       type: DataTypes.DATE
//     },
//     bio: {
//       type: DataTypes.TEXT
//     },
//     jobs: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       defaultValue: []
//     },
//     social: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       defaultValue: []
//     }
//   },
//   {
//     sequelize,
//     modelName: "Profile",
//     tableName: "profiles",
//   }
// );

// UserNotification.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: {
//       type: DataTypes.CHAR(255),
//       allowNull: false
//     },
//     body: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     notification_redirect_url: {
//       type: DataTypes.CHAR(100)
//     },
//     notification_type: {
//       type: DataTypes.CHAR(30)
//     }
//   },
//   {
//     sequelize,
//     modelName: "UserNotification",
//     tableName: "user_notifications",
//     timestamps: false
//   }
// );
