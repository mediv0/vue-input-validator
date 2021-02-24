# 🛡️ Vue-input-validator  

[![Build](https://img.shields.io/circleci/build/github/mediv0/vue-input-validator/master)](https://img.shields.io/circleci/build/github/mediv0/vue-input-validator/master) [![codecov](https://codecov.io/gh/mediv0/vue-input-validator/branch/master/graph/badge.svg)](https://app.codecov.io/gh/mediv0/vue-input-validator) [![CodeFactor](https://www.codefactor.io/repository/github/mediv0/vue-input-validator/badge)](https://www.codefactor.io/repository/github/mediv0/vue-input-validator) [![license](https://img.shields.io/github/license/mediv0/vue-input-validator)](https://img.shields.io/github/license/mediv0/vue-input-validator) [![Maintainability](https://api.codeclimate.com/v1/badges/e541b825abb249aee993/maintainability)](https://codeclimate.com/github/mediv0/vue-input-validator/maintainability)

## What is this package all about?
By using this package, you can create input validators only with the help of a single directive without the need for additional settings; You can create a custom validator with the help of regex or functions, and it will automatically append to your textbox!

- Lightweight (4kb gzipped) ☁️
- Simple API 🎈
- Customizable 🧰
- Support for async & ajax validation 👊
- Easy to use ✔️
- Mobile-friendly 📱
- TypeScript support 🔒

<br />

### Table of Contents

-   [`Installation`](#installation)
-   [`Usage`](#usage)
-   [`Plugin options`](#plugin-options)
-   [`User options`](#user-options)
-   [`Asynchronous validation`](#async-validation)
-   [`Hooks`](#hooks)
-   [`Styling`](#styling)
-   [`Security`](#security)
-   [`Caveats`](#caveats)
-   [`Examples`](#examples)
-   [`Contribution`](#contribution)

<br />


### Installation

npm
```bash
npm i @mediv0/vue-input-validator
```

yarn
```bash
yarn add @mediv0/vue-input-validator
```

<br />


### Usage

You can import and use the package like below:
```javascript index.js
import Vue from "vue;
import validator from @mediv0/vue-input-validator;

Vue.use(validator, options);

```

Add these lines to your component:
```javascript
<template>
    <div id="App">
        <input v-validator="validatorOptions" />
    </div>
</template>

<script>
export default {
    data()
    {
        return {
              validatorOptions: { ... } 
        }
    }

}
</script>

```
the v-validator directive will wrap your input in a span container and also adds the input-validator component to the span container. (See the picture below)

![input validator component](https://i.imgur.com/WTqtTkW.jpg "input validator component")

For more information about validator options, please check:  [Plugin options](#plugin-options) and [User options](#User-options)

<br />


### Plugin options

| Property name | default value |  description                                  | is optional   |
| ------------- |:-------------:| :---------------------------------------------| :------------:|
| name          | validator     | `changing the name of directive`               |      ✅      |       
| success       | #2DE68F       | `color when validation is successful`         |      ✅      |       
| unchecked     | #979797       | `default color when rendering the validator`  |      ✅      |       
| failed        | #FF4343       | `color when validation fails`                 |      ✅      |        




You can pass these options while initiating the plugin.

```javascript

Vue.use(validator, {
    name: "name",    // rename v-validator directive to v-name
    
    // color options can be css values like: rgb, rgba, hex, hls etc....
    success: "green",
    failed: "red", 
    unchecked: "gray"
});

```

<br />


### User options
These options are reactive component-level properties and can be changed anytime in your app.

<br />

#### **`key: string  -  default: undefiend`**
If you have multiple validator instances on your page, you can use this option to give them unique names and access those validators by their name across your app.

#### **`hideLines: boolean  -  default: false`**
With this option, you can show or hide the lines below your input.

#### **`hideLabels: boolean  -  default: false`**
With this option, you can show or hide the labels below your input based on the entered input.

#### **`circleSize: number  -  default: 8`**
With this option, you can change the size of the circle of each label (use px-pixle to set height & width).

#### **`disable: boolean  -  default: false`**
With this option, you can enable or disable the validator functionality.

#### **`items:  Array<{ label: string; test: Function | RegExp }>`**
This option will take an Array of Objects that contain your validation rules.

#### **`onSuccess:  Callback() => boolean  -  default: null`**
This option will take a callback and run it when all of the validations pass.

<br />

The object that is passing to the items property should have two keys: `label` and `test`
- **label** is a string value that describes your test.
- **test** can be a regex or function depending on your needs. You can implement any test (validation) and there are no restrictions in this regard.

**`Using test with function`**
🚨 If you want to pass the test property to the function, take note that this function must return a boolean type, also this function will take the current value of bonded input as its parameter.

```javascript
items: [
      {
        label: "my test"
        test: (val) => {
              if (val === "test") {
                  return true;     
              } else {
                  return false;
              }
          }
      }
],
```

<br />

### Asynchronous validation
The validator component also supports async tests. For example, if you need to validate your info from a server you can use async tests.

**Remember that async tests must return boolean***

the below example will show you how to use async tests:
```javascript
...
test: (val) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (val === "reza") {
                resolve(true);
            } else {
                reject(false);
            }
        }, 2000);
    })
},
...
```

⚠️ You might notice that the async validation is activated every time user hits the keyboard, this would cause a performance issue if we are making an ajax request. To fix this issue you can use the denounce option. For example, we can set the debounce option to half a second (500 milliseconds), so that the validation is postponed until the user stops typing for half a second.

```javascript
const options = {
  items: [ ... ],
  debounce: 500 // in milliseconds
}
```
the debounce works with both sync and async.

<br />

A list of all options is also available for you to check [options example](https://github.com/mediv0/vue-input-validator/blob/master/public/validatorOptions.ts)

<br />

### onError
If you don't want to show labels or lines below your input or if you just want to validate your input on some events or special conditions, you can set onError options in your option object.

onError options:

| Option name   | default value          |  description                                                                    | possible values     |
| ------------- |:----------------------:| :-------------------------------------------------------------------------------| :------------------:|
| msg           | undefiend              | `The message that will be displayed when validation fails`                      |      strings        |       
| color         | default plugin color   | `This can be any color. If not specified, it will use the default color`     |      any color      |       
| highlight     | false                  | `show red border highlight around your input when validation fails`             |      true - false   |       
| direction     | ltr                    | `direction of your error message`                                               |      ltr - rtl      |   

## 🚨 when using onError:
- **Options: disable, hideLables, hideLines, circleSize, onSuccess, debounce will not work anymore.**
- **isValid and showError hooks are disabled when using onError.**
- **onError will expose [`validate hook`](#$validator.isValid(key):-boolean) that you can use to validate your inputs.**

This is useful when you don't want to show the default style of validator under your component and disable its real-time validation checking.

A list of all options is also available for you to check [options example](https://github.com/mediv0/vue-input-validator/blob/master/public/validatorOptions.ts)


<br />


⚠️ For typescript users, you can change your Object type to `IchecksProp` for type checking.
```javascript
import { IchecksProp } from "@mediv0/vue-input-validator";

...

validatorOptions: IchecksProp = { ... ]

...
```

<br />

### Hooks
there are 3 hooks that will be exposed on Vue instance. These hooks are global and can be accessed across your app.

#### `$validator.isValid(key): boolean`
Checks if the validation is done or not - `Only works when you haven't set onError in your options.`


isValid takes an argument, the key of your option, and checks if that option is passed or not.

**example**
```javascript
...
  data() {
      return {
          options: {
              key: "email",
              ...
          }
      }
  },
  methods: {
      login() {
          if(this.$validator.isValid("email")) {
              this.sendRequest();
          } else {
              // access denied 
          }
      }
  }
...
```


#### `$validator.showError(key?): void`
Changes all test labels that have not been validated to red - `Only works when you haven't set onError in your options because there are no labels when using onError.`


If you don't pass the key to this function, every input that uses the v-validator directive will turn red. but if you pass the key to this function, only the specified key will turn red if their tests fail.

**example**
```javascript
...
  methods: {
      submitForm() {
          if(this.$validator.isValid()) {
              this.sendRequest();
          } else {
              // every input that use v-validator with turn red
               this.$validator.showError(); 
          }
      }
  }
...
```


#### `$validator.validate(...keys): Promise<boolean[]>`
Use this function to validate your forms (inputs) or events - `Only works when onError is set in your options object.`

This function will return a promise of key-value pairs after all validations are done. Also if you want to chain multiple validations you can pass their keys as an argument and get the result of validations in return.


**If validation fails, validate will show your error under bonded input.**

usage: 
```javascript
data() {
    return {
        emailOptions: {
            key: "email",
            ...
            onError: {
                msg: "email validation failed, try again",
            }
        },
        phoneOption: {
            key: "phone",
            ...
            onError: {
                msg: "please enter valid phone",
            }
        }
    }
},

methods: {
    async login() {
        const result = await this.$validator.validate("email", "phone");
        console.log(result);

        /*
            
            get the result of validations in a object
            result = {
                email: true,
                phone: false
            }

        */
    }
}
```

Take note that if you chain multiple tests inside an option (take the email option in the example above). the v-validator will execute all of your tests and combine their result in one boolean value. Because of this if only one of your tests in that chain fails, the entire option validation will fail too.

```javascript
    email: {
        items: [
            {
                label: "this will fail",
                test: () => false
            },
            {
                label: "second",
                test() => true
            }
        ]
    }

    methods: {
        async login() {
            await this.$validator.validate("email");
            // email wil fail because first test in its chain will fail
        }
    }

```


#### Check [`Examples`](#examples) to get started with this package


<br />

### Styling
You can control the basic styles with plugin options. However, if you want more customization, you can overwrite validator styles in your CSS. Check [style.scss](https://github.com/mediv0/vue-input-validator/blob/master/src/component/style.scss) to get familiar with the structure.


### Responsive
As we know validator directive will create a span container and inject your input & validator component into it. This span will have `display: inline-block` and `width: 100%` as its default styling for responsive purposes. Also, `font-family` and `font-size` are inherited from their parent. So if you want to control font size or font-family of validator component you can create a wrapper around your input and put your styles in it.

**example**

```html
<div class="App">
  <div class="container">
    <input v-validator="options" />
  </div>
</div>

<style>
  .container {
    width: 400px;
    font-family: "Poppin";
  }
</style>

```

<br />

### Security
If you are using this package to validate password input, it's better to set `hideLabels` to `true`  in your login page to prevent an attacker to see your rules or something like that.

<br />

### Caveats
The validator component will be injected into the page after bonded element inserts, because of that, this.$validator functions won't work on created lifecycle hook.

You can access it in the mounted function like the example below to get the data on page load.
```javascript
<template>
    div v-if="isDataValid"> ... </div>
</template>

data() {
    isDataValid: "..."
}

mounted() {
    this.isDataValid = this.$validator.isValid();
}

```

<br />

### Examples
Check [public folder](https://github.com/mediv0/vue-input-validator/tree/master/public)  or  codeandbox for more examples.


### Contribution

1.  [Fork the project](https://github.com/XeniacDev/xmodal/archive/master.zip)
2.  Create your feature branch (`git checkout -b new-feature-branch`)
3.  Commit your changes (`git commit -am 'add new feature'`)
4.  Push to the branch (`git push origin new-feature-branch`)
5.  [Submit a pull request!](https://github.com/XeniacDev/xmodal/pulls)

**Feel free to request new features!**

### License

[MIT](http://opensource.org/licenses/MIT)

### Todo

-   [ ] Vue 3
-   [x] more options
-   [ ] caching system 
-   [x] async tests
-   [x] validation chain
-   [ ] buit in validations
-   [x] debounce option
