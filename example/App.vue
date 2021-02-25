<template>
    <div id="App">
        <div class="wrapper">
            <div class="wrapper__box">
                <div class="wrapper__box__hero"></div>
                <div class="wrapper__box__body">
                    <h1 style="margin-bottom: 20px">Create new account</h1>
                    <p class="input_title">email</p>
                    <input type="text" placeholder="enter your email" v-validator="emailOptions" />

                    <p class="input_title">username</p>
                    <input type="text" placeholder="enter your username" v-validator="usernameOption" />

                    <p class="input_title">password</p>
                    <input type="password" placeholder="enter your username" v-validator="passwordOption" />

                    <button @click="login">{{ isLoading ? loading : "Create account" }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            loading: "loading please wait...",
            loggedIn: false,

            emailOptions: {
                key: "email",
                items: [
                    {
                        label: "",
                        test: val => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    // email regex
                                    const reg = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

                                    const result = reg.test(val);

                                    if (result) {
                                        resolve(true);
                                    } else {
                                        reject(false);
                                    }
                                }, 2000);
                            });
                        }
                    }
                ],
                onError: {
                    msg: "please enter valid email",
                    highlight: true
                }
            },

            usernameOption: {
                key: "username",
                items: [
                    {
                        label: "",
                        test: /^[a-zA-Z]/
                    }
                ],
                onError: {
                    msg: "username should be text",
                    highlight: true
                }
            },

            passwordOption: {
                key: "password",
                onSuccess: () => console.log("hello"),
                items: [
                    {
                        label: "atleast 8 characters",
                        test: val => val.length >= 8
                    },
                    {
                        label: "The string must contain at least 1 numeric character",
                        test: /(?=.*[0-9])/
                    },
                    {
                        label: "The string must contain at least one special character",
                        test: /(?=.*[!@#$%^&*])/
                    },
                    {
                        label: "The string must contain at least 1 uppercase alphabetical character",
                        test: /(?=.*[A-Z])/
                    },
                    {
                        label: "The string must contain at least 1 lowercase alphabetical character",
                        test: /(?=.*[a-z])/
                    }
                ]
            }
        };
    },

    methods: {
        async login() {
            console.log("hello");
            this.isLoading = true;
            await this.$validator.validate("email", "username");

            if (!this.$validator.isValid("password")) {
                this.$validator.showError("password");
            }
            this.isLoading = false;
        }
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

body {
    font-size: 13px;
}
*,
*::before,
*::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.wrapper {
    background: black;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    &__box {
        width: 76%;
        height: 600px;
        border-radius: 15px;
        background: white;
        overflow: hidden;

        display: flex;

        &__hero {
            width: 270px;
            background: rgb(223, 223, 223) url("https://mir-s3-cdn-cf.behance.net/project_modules/1400/c0bdd180548905.5ce57356e95e2.jpg") center;
            background-size: cover;
        }

        &__body {
            flex: 1;
            padding: 50px;
            overflow: auto;
        }
    }
}

input {
    width: 100%;
    height: 65px;
    border: 1px solid white;
    background: rgb(226, 226, 226);
    padding: 0 20px;
    border-radius: 15px;
    outline: none;
    font-weight: 400;
    font-size: 14px;
    transition: all 0.5s ease;
}

button {
    width: 220px;
    background: rgb(34, 34, 236);
    color: white;
    border-radius: 15px;
    border: none;
    outline: none;
    padding: 23px 0;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
        background: rgb(12, 12, 144);
    }
}

.activeLink {
    color: rgb(34, 34, 236) !important;
}

.input_title {
    margin-top: 5px;
}
</style>
