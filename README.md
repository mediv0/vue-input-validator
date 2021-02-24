# 🛡️ Vue-input-validator

## What is this package all about?
Using this package, you can create validation for your inputs without the need for additional settings and only with the help of a single directive. You can create custom validation with the help of regex or functions and it will automatically append to your textbox!

- Lightweight (4kb gzipped) ☁️
- Simple API 🎈
- Customizable 🧰
- Easy to use 🥷
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

import & use the package
```javascript index.js
import Vue from "vue;
import validator from @mediv0/vue-input-validator;

Vue.use(validator, options);

```

in your component
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
v-validator directive with wrapp your input in a span container and add validation component to it under the input (picture below)

![input validator component](https://i.imgur.com/WTqtTkW.jpg "input validator component")

For more info about validator options check:  [Plugin options](#plugin-options) and [User options](#User-options)

<br />


### Plugin options

| Property name | default value |  description                                  | is optional   |
| ------------- |:-------------:| :---------------------------------------------| :------------:|
| name          | validator     | `changing the name of directiv`               |      ✅      |       
| success       | #2DE68F       | `color when validation is successful`         |      ✅      |       
| unchecked     | #979797       | `default color when rendering the validator`  |      ✅      |       
| failed        | #FF4343       | `color when validation fails`                 |      ✅      |        




you can pass these options when initiating the plugin.

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
these options are component-level properties that are reactive and can be changed anytime in your app

<br />

#### **`key: string  -  default: undefiend`**
if you have multiple validator instances on your page, you can use this option to give them unique names and access those validators by their name across your app.

#### **`hideLines: boolean  -  default: false`**
this option will hide or show lines under your input.

#### **`hideLabels: boolean  -  default: false`**
this option will hide or show labels under your input based on given input.

#### **`circleSize: number  -  default: 8`**
this option will change size of lable's circle (use px-pixle to set height & width).

#### **`disable: boolean  -  default: false`**
this option will disable validator functionality.

#### **`items:  Array<{ label: string; test: Function | RegExp }>`**
this option will take Array of Objects that contain your validation rules.

#### **`onSuccess:  Callback() => boolean  -  default: null`**
this option will take a callback and run it when all validations pass.

<br />

the object that is passing to items property should have two keys: `label` and `test`
- **label** is a string value that describes your test
- **test** can be a regex or function depending on your needs. you can implement any test(validation) and there are no restrictions in this regard.

**`Using test with function`**
🚨 if you want pass function the the test property take note that this function must have return type true or false, also this function will take current value of bonded input as its parameter

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
the validator component can also support async tests. for example, if you need to validate your info from a server you can use async tests.

**Remember that async tests must return true or false***

example below will show you how you can use async tests:
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

⚠️ You might notice that the async validation is activated every time user hits the keyboard, this would cause performance issue if we are making ajax request.
to fix this issue you can youse debounce option. we set the **`debounce`** option to half a second (for example), so that the validation is postponed until user stops typing for half a second.

```javascript
const options = {
  items: [ ... ],
  debounce: 500 // in milliseconds
}
```
also debouce works with both sync & async

<br />

A list of all options is also available for you to check [options example](https://github.com/mediv0/vue-input-validator/blob/master/public/validatorOptions.ts)

<br />

### onError
if you don't want to show labels or lines under your input or if you want just to validate your input on some events or special conditions, you can set onError option in your option object.

onError options:

| Option name   | default value          |  description                                                                    | possible values     |
| ------------- |:----------------------:| :-------------------------------------------------------------------------------| :------------------:|
| msg           | undefiend              | `The message that will be displayed when validation fails`                      |      strings        |       
| color         | default plugin color   | `this can be any color. if if do not specify, this will use default color `     |      any color      |       
| highlight     | false                  | `show red border highlight around your input when validation fails`             |      true - false   |       
| direction     | ltr                    | `direction of your error message`                                               |      ltr - rtl      |   

## 🚨 when using this option:
- **Options: disable, hideLables, hideLines, circleSize, onSuccess, debounce will not work anymore**
- **isValid and showError hooks are disabled when using onError**
- **onError will expose [`validate hook`](#validate-hook) that you can use to validate your inputs**

this is useful when if you don't want to show default style of validator under your component, and disable its realtime validation checking

A list of all options is also available for you to check [options example](https://github.com/mediv0/vue-input-validator/blob/master/public/validatorOptions.ts)


<br />


⚠️ for typescript users you can change your Object type to `IchecksProp` for type checking.
```javascript
import { IchecksProp } from "@mediv0/vue-input-validator";

...

validatorOptions: IchecksProp = { ... ]

...
```

<br />

### Hooks
there are 3 hooks that will be exposed on Vue instance. these hooks are global and can be accessed across your app

#### `$validator.isValid(key): boolean`
Checks if the validation is done or not - `Only works when you dont set onError in your options`


isValid takes an argument, key of your option, and check if that option is passed or not.

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
Changes all test labels that have not been validated to red - `Only works when you dont set onError in your options because there is no labels when using onError`


if you don't pass the key to this function, every input that uses v-validator directive will turn red. but if you pass key to this function, only specified key will turn red if their tests fails.

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
use this function to validate your forms(inputs) or events, `only works when onError is set in your options object`

this function will return a promise of key value pairs after all of validations are done.
also if you want to chain multiple validations you can pass their keys as argument and get the result of validations in return
**if validation fails, validate will show your error under bonded input**

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

take note that if you chain multiple tests inside a option (take email option in example above). v-validator will execute all of your tests and combine their result in one boolean value. because of this if one of your tests fails in that chain, the entire option validation will fail too.

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
<br />

### Styling
you can control the base styles with plugin options. however, if you want more customization you can overwrite validator styles in your CSS
you can check [style.scss](https://github.com/mediv0/vue-input-validator/blob/master/src/component/style.scss) to get familiar with the structure


### Responsive
as we know validator directive will create a span container and inject your input & validator component into it. this span will have `display: inline-block` and `width: 100%` as its default styling for responsive purposes. also `font-family` and `font-size` are inherited from their parent. so if you want to control font size or font-family of validator component you can create wrapper around your input and put your styles in it.

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

#### check [`Examples`](#examples) to get started with this package

<br />

### Security
if you are using this package to validate password input, it's better to set `hideLabels` to `true`  in your login page to prevent an attacker to see your rules or something like that.

<br />

### Caveats
validator component will be injected into the page after bonded element inserts, because of that, this.$validator functions won't work on created lifecycle hook.

you can access it in mounted like example below to get the data on page load
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
check [public folder](https://github.com/mediv0/vue-input-validator/tree/master/public)  or  codeandbox for more examples


### Contribution

Please make sure to read the [Contributing Guide](https://github.com/mediv0/v-bucket/blob/master/.github/contributing.md) before making a pull request.

**feel free to request new features!**

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
