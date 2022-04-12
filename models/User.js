const bcrypt = require('bcrypt')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

//create our USer model
class User extends Model{}

//Define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINTIONS GO HERE

        //define an id column 
        id:{
            //use the special Sequelize Datatypes objects provide what tpe of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQLS 'NOT NULL' option
            allowNull: false,
            //this instruct that this is the primary key
            primaryKey: true,

            //turn on auto increment
            autoIncrement: true
        },
        //define a username column 
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be atleast four characters long 
                len: [4]
            }
        }
    },
    //second object
    {
        hooks: {
           
           async beforeCreate(newUserData){
             newUserData.password = await bcrypt.hash(newUserData.password, 10)
             return newUserData
            },
            //set up beforeUpdate lifecyle "hook" functionality
            async beforeUpdate(updatedUserData){ 
                updatedUserData.password = await bcrypt.hash(updatedUserData, 10)
                return updatedUserData
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))


        //pass in our imported sequalize conection (this direct connection to our database)
        sequelize,
        //dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //dont pluraize name of database table
        freezeTableName: true,
        //use underscored instead of camel-casing (i.e comment_text abd not commentText)
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
)

module.export = User