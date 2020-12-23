/**
 * 
 * @author Dibyaranjan Pradhan <dibyachintu6@gmail.com>
 * @since 19-Jul-2020
 * @description APP constants, API key-passwords
 */


module.exports = {
    ACTION: {
        CREATE: 'create',
        DELETE: 'delete',
        READ: 'read',
        UPDATE: 'update',
    },
    BONUS: {
        DAILY_MAX_COUNT: 4,
        RANGE: {
            MAX: 2,
            MIN: 0,
        },
    },
    CRYPTO_TO_SECRET: "$#@mytrades10121#$",
    FILE: {
        MIME_TYPE: {
            APPLICATION: {
                OCTET_STREAM: 'application/octet-stream',
                OGG: 'application/ogg',
                JSON: 'application/json',
                VND_MS_EXCEL: 'application/vnd.ms-excel',
                ZIP: 'application/zip',
            },
            AUDIO: {
                WAVE: 'audio/wave',
                WAV: 'audio/wav',
                OGG: 'audio/ogg',
                MP3: 'audio/mp3',
                MP4: 'audio/mp4',
                MPEG: 'audio/mpeg',
                X_AAC: 'audio/x-aac',
                AAC: 'audio/aac',
                AMR: 'audio/amr'
            },
            IMAGE: {
                JPEG: 'image/jpeg',
                PNG: 'image/png',
                GIF: 'image/gif',
            },
            TEXT: {
                CSV: 'text/csv'
            },
            VIDEO: {
                WAVE: 'video/wave',
                WAV: 'video/wav',
                OGG: 'video/ogg',
                MP4: 'video/mp4'
            },
        },
    },
    GENERIC: {
        DATABASE: {
            MAXIMUM: {
                LIMIT: 100,
                SKIP: 0,
                SORT: 1,
                // SORT: "{\"sort\":-1}",
            }
        },
    },
    // GOOGLE_MAP_KEY: 'AIzaSyAloAZOj8qd7H0vhVqvkuznLGyq0X61vyg',  // local implement
    HOUR_FORMAT_CHANGE: true, // false means Time format in 24Hrs, else in 12Hr(AM/PM)
    HTTP: {
        STATUS: {
            OK: {
                CODE: 200,
                MESSAGE: 'SUCCESS'
            },
            PARTIAL_SUCCESS: {
                CODE: 206,
                MESSAGE: 'PARTIAL_SUCCESS'
            },
            BAD_REQUEST: {
                CODE: 400,
                MESSAGE: 'BAD_REQUEST'
            },
            NOT_AUTHENTICATED: {
                CODE: 401,
                MESSAGE: 'NOT_AUTHENTICATED'
            },
            NOT_AUTHORIZED: {
                CODE: 403,
                MESSAGE: 'NOT_AUTHORIZED'
            },
            NOT_FOUND: {
                CODE: 404,
                MESSAGE: 'NOT_FOUND'
            },
            CONFLICT: {
                CODE: 409,
                MESSAGE: 'CONFLICT'
            },
            UNPROCESSABLE: {
                CODE: 422,
                MESSAGE: 'UNPROCESSABLE'
            },
            INVALID_TOKEN: {
                CODE: 417,
                MESSAGE: 'INVALID_TOKEN'
            },
            ATTEMPT_EXCEEDED: {
                CODE: 429,
                MESSAGE: 'ATTEMPT_EXCEEDED'
            },
            LOCKED: {
                CODE: 423,
                MESSAGE: 'LOCKED'
            },
        },
    },
    JWT: {
        AUDIENCE: {
            ADMIN: 'admin',
            AUTH: 'auth',
            SCHEDULER: 'scheduler',
            SERVER: 'server',
            TEMPORARY: 'temporary',
            USER: 'user',
        },
        EXPIRY: {
            TOKEN: {
                MILLISECONDS: 2592000000, // 30day=30*24*60*60*1000
            },
            TEMPORARY_TOKEN: {
                MILLISECONDS: 600000, // 10min=10*60*1000
            }
        },
        SECRET: 'sUPerSeCuREKeY&^$^&$^%$^%7782348723t4872t34Ends',
    },
    LEVEL: {
        HIERARCHY: [
            { levelRank: 0, name: "Alpha", minSteps: 5000, coinsLimit: 5, since: Date.now() },
            { levelRank: 1, name: "Bravo", minSteps: 10000, coinsLimit: 10, since: Date.now() },
            { levelRank: 2, name: "Charlie", minSteps: 15000, coinsLimit: 15, since: Date.now() },
            { levelRank: 3, name: "Delta", minSteps: 20000, coinsLimit: 20, since: Date.now() },
        ],
        TARGET_ACHEIVE_PER_WEEK: {
            FOR_SAME_LEVEL: 4, // per week min(count) days to acheive target(min_steps as per the user level) to stay in same level
            // FOR_NEXT_LEVEL:5, // per week min(count) days to acheive target(min_steps as per the user level) to go to next higher level // not required now
        },
    },
    LOG: {
        TYPE: {
            API: 'api'
        },
    },
    NOTIFICATION: {
        SMS: {
            CREDENTIAL: {
                AUTHKEY: '278870ARNLaMrTloy5cff3153'
            },
            MESSAGE: {
                LOGIN: 'Your one time password(OTP) for After School Login is {{otp}} and is valid for {{otpExpiry}} min(s) only. Kindly keep it confidential.',
                REGISTRATION: 'Your one time password(OTP) for After School registration is {{otp}} and is valid for {{otpExpiry}} min(s) only. Kindly keep it confidential.',
            },
            PROPERTY: {
                SENDER: "AFTSCH",
                ROUTE: "4",
                COUNTRY: "91",
                UNICODE: "1",
                URL: {
                    CHECK_BALANCE: 'https://control.msg91.com/api/balance.php?authkey={{authkey}}&type=4',
                    SEND_SMS: 'https://api.msg91.com/api/v2/sendsms',
                },
            },
            PROVIDER: 'msg91',
        },
    },
    NUMBER: {
        DECIMAL: {
            PRECISION: 2,
        },
    },
    PHONE_COUNTRY_CODE: {
        INDIA: '91'
    },
    POWER_BOOSTER: {
        DAILY_MAX_COUNT: 2,
        DURATION: {
            MILLISECONDS: 1800000, // 30min=30*60*1000
        },
    },
    // SERVER_HOST: 'localhost:8001', //local server
    SERVER_HOST: 'http://13.232.31.31:8001', // AWS server 
    STEPS: {
        DAILY_MIN_COUNT: 5000,
        EXTRA_WITH_POWER: 1000,
        PRICE: {
            NORMAL: 0.001,
            WITH_POWER: 0.002,
        },
        STATS: {
            FREQUENCY: {
                HOUR: 4,
            },
        },
    },
    STRING: {
        TRUE: 'true',
        FALSE: 'false',
        UNKNOWN: 'UNKNOWN',
        GIN: 'GIN',
        GOUT: 'GOUT',
        FORWARD_SLASH: '/',
        PIPE: '|',
        COMMA: ',',
        DOT: '.',
        STAR: "*",
        WHITESPACE: ' ',
        EMPTY: "",
    },
    TIME: {
        FORMAT: {
            FULL: 'full',
            HALF: 'half',
        },
        OFFSET: {
            IST: +330,
        },
        TIMESTAMP: {
            JAVASCRIPT: 'javascript',
            UNIX: 'unix',
        },
    },
    TOKEN: {
        CHAR: {
            DEFAULT: {
                LENGTH: 6,
                TYPE: 'numeric',
            },
            TYPE: {
                NUMERIC: 'numeric',
                ALPHA_NUMERIC: 'alpha_numeric',
                ALPHABETS: 'alphabets',
            },
        },
        EXPIRY: { // seconds
            LOGIN: 600,
            REGISTRATION: 600,
        },
        RETRIES: {
            LOGIN: 5,
            REGISTRATION: 5,
        },
        TYPE: {
            LOGIN: 'login',
            REGISTRATION: 'registration',
            RESET_PASSWORD: 'reset_password',
            UPDATE_EMAIL: 'update_email',
            UPDATE_PHONE: 'update_phone',
        },
    },
    USERS: {
        AUTHTYPE: {
            EMAIL: 'email',
            PHONE: 'phone',
            GOOGLE: 'google',
            FACEBOOK: 'facebook',
        },
        TYPE: {
            ADMIN: 'admin',
            USER: 'user',
        },
        STATUS: {
            ACTIVE: 'active', // active account
            DELETED: 'deleted', // deleted by Admin
            INACTIVE: 'inactive', // 
            LOCKED: 'locked', // locked by wrong-passowrd try
            NOT_VERIFIED: 'not_verified', // not yet verified by user, authtype:email
        },
    },
};
