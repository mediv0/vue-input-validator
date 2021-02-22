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
-   [`Hooks`](#hooks)
-   [`Styling`](#styling)
-   [`Security`](#security)
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

#### **`onSuccess:  Callback() => boolean  -  default: null`**
this option will take a callback and run it when all validations pass.

#### **`hide: boolean  -  default: false`**
this option will hide or show labels under your input based on given input.

#### **`circleSize: number  -  default: 8`**
this option will change size of lable's circle (use px-pixle to set height & width).

#### **`disable: boolean  -  default: false`**
this option will disable validator functionality.

#### **`items:  Array<{ label: string; test: Function | RegExp }>`**
this option will take Array of Objects that contain your validation rules.

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

**For reference:**
```javascript
  data() {
        return {
            validatorOptions: {
                items: [
                    {
                        label: "my first validation",
                        test: /[1-9]/
                    },
                    {
                        label: "my second validation",
                        test: (val) => val > 10 ? true : false
                    }
                ],
                onSuccess: () => {},
                hide: true,
                circleSize: 10
            }
        };
    }
```

⚠️ for typescript users you can change your Object type to `IchecksProp` for type checking.
```javascript
import { IchecksProp } from "@mediv0/vue-input-validator";

...

validatorOptions: IchecksProp = { ... ]

...
```

<br />

### Hooks
there are two hooks that will be exposed on Vue instance. these hooks are global and can be accessed across your app

#### `$validator.isValid(): boolean`
Checks if the validation is done or not

**example**
```javascript
...
  methods: {
      login() {
          if(this.$validator.isValid()) {
              this.sendRequest();
          } else {
              // access denied 
          }
      }
  }
...
```


#### `$validator.showError(): void`
Changes all tests that have not been validated to red

**example**
```javascript
...
  methods: {
      submitForm() {
          if(this.$validator.isValid()) {
              this.sendRequest();
          } else {
               this.$validator.showError(); 
          }
      }
  }
...
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

<br />

### Security
if you are using this package to validate password input, it's better to set `hide` to `true`  in your login page to prevent an attacker to see your rules or something like that.

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
-   [ ] more options
-   [ ] caching system 
-   [ ] async tests
-   [ ] passing custom props to the test functions
-   [ ] validation chain
-   [ ] buit in validations
-   [ ] debounce option
