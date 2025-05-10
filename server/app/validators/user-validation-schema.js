import User from '../models/user-model.js';

export const userRegisterSchema = {
    name: {
        exists: {
            errorMessage: "Name field is required"
        },
        notEmpty: {
            errorMessage: "Name cannot be empty"
        },
        trim: true
    },
    email: {
        exists: {
            errorMessage: "Email field is required"
        },
        notEmpty: {
            errorMessage: "Email cannot be empty"
        },
        isEmail: {
            errorMessage: "Email must be in correct format"
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email is already taken');
                }
                return true;
            }
        }
    },
    password: {
        exists: {
            errorMessage: "Password field is required"
        },
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 10,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: "Password must be at least 10 characters long and include uppercase, lowercase, number, and symbol"
        },
        trim: true
    },
    phoneNumber: {
        exists: {
            errorMessage: "Phone number field is required"
        },
        notEmpty: {
            errorMessage: "Phone number cannot be empty"
        },
        isMobilePhone: {
            options: ['any'],
            errorMessage: "Phone number must be a valid mobile number"
        },
        trim: true
    }
};



export const userLoginSchema = {
    email: {
        exists: {
            errorMessage: 'email field is required.'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be valid format'
        }, 
        trim: true,
        normalizeEmail: true,
    },
    password: {
        exists: {
            errorMessage: 'email field is required.'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumber: 1,
                minSymbol: 1
            },
            errorMessage: 'password must contain atleast one uppercase, 1 lowercase, 1 number, 1 symbol,minimum length is 8.'
        }, 
        trim: true
    }
}