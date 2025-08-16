import DataTypes from 'sequelize';


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


export const followTable = (sequelize) => {
    const follow = sequelize.define(
        "follow",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            from_user_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            to_user_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );
    return follow;
}

export const WalletTable = (sequelize) => {
    const wallet = sequelize.define(
        "wallet",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            amount: {
                type: DataTypes.DECIMAL(15, 3),
                defaultValue: 0
            },
            is_active: {
                type: DataTypes.BIGINT,
                defaultValue: true
            }
        },
        {
            timestamps: false
        }
    );
};

export const CartNumberTable = (sequelize) => {
    const cartNumber = sequelize.define(
        "cart_number",
    {
        id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        cart: {
        type: DataTypes.CHAR(16),
        allowNull: false
        },
        is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
        },
        is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        }
    },
    {
        timestamps: false
    }
    )
};

export const ProfileTable = (sequelize) => {
    const profile = sequelize.define(
        "profile",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
            first_name: {
            type: DataTypes.CHAR(255)
        },
            last_name: {
            type: DataTypes.CHAR(255)
        },
            birth_date: {
            type: DataTypes.DATE
        },
            bio: {
            type: DataTypes.TEXT
        },
            jobs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
            social: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    },
    {
        timestamps: false
    }

    )
};

export const UserNotificationTable = (sequelize) => {
    const UserNotification = sequelize.define(
        "user_notification",
        {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        notification_redirect_url: {
            type: DataTypes.CHAR(100),
            allowNull: true
        },
        notification_type: {
            type: DataTypes.CHAR(30),
            allowNull: true
        }
    },
    {
        timestamps: false
    }
        
    )
};
