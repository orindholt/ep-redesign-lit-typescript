import {LitElement, html, css, unsafeCSS} from 'lit';

const resetErrorStyle = (target, error) => {
  if (target.name && target.name != 'tos')
    if (target.style.color) target.style.color = '';
  if (target.style.borderColor) target.style.borderColor = '';
  if (target.style.display == 'block') target.style.display = '';
  if (!target.style) target.removeAtrribute('style');
  if (error.style.display == 'block') error.style.display = '';
  if (!error.style) target.removeAtrribute('style');
};

const setErrorStyle = (input, errorIcon, errorText, i) => {
  if (input.name != 'tos') {
    input.style.color = '#f82858';
    input.style.borderColor = '#f82858';
    input.oninput = (e) => {
      if (e.target.style.color) e.target.style.color = '';
      if (e.target.style.borderColor) e.target.style.borderColor = '';
      if (!e.target.style) e.target.removeAtrribute('style');
    };
  } else {
    input.style.borderColor = '#f82858';
    input.onchange = (e) => {
      if (e.target.style.borderColor) e.target.style.borderColor = '';
      if (!e.target.style) e.target.removeAtrribute('style');
      if (errorIcon.style.display == 'block') errorIcon.style.display = '';
    };
    if (errorIcon.style.display != 'block') errorIcon.style.display = 'block';
  }
  if (errorText.style.display != 'block') errorText.style.display = 'block';
  if (!i) {
    errorText.textContent =
      input.name == 'tos'
        ? '* Please agree to the terms of service'
        : input.name == 'password' && input.value.length < 8
        ? '* Password needs to include atleast 8 characters.'
        : input.name == 'password' && !/\d/.test(input.value)
        ? '* Password needs to include atleast one number'
        : `* Please enter a vaild ${input.name}`;
  }
};

const validation = (inputElements, errorIcon, errorText, test = false) => {
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let i = 0;
  let error = false;
  if (inputElements) {
    inputElements.forEach((input) => {
      if (
        !input.value ||
        (input.name == 'email' && !emailRegEx.test(input.value)) ||
        (input.name == 'password' && !passRegEx.test(input.value)) ||
        (input.name == 'tos' && !input.checked)
      ) {
        if (!test) setErrorStyle(input, errorIcon, errorText, i);
        i++;
        error = true;
      }
    });
  }
  console.log(error);
  return error;
};

export class Login extends LitElement {
  static styles = [
    css`
      .tos-checkbox:checked {
        border-color: #ffa626 !important;
      }
      .tos-checkbox:checked::before {
        width: 100%;
        height: 100%;
        position: absolute;
        display: grid;
        place-content: center;
        padding-bottom: 4px;
        background-color: #ffa626;
        border-color: #ffa626;
        content: url('./images/check.svg');
      }
      @-moz-document url-prefix() {
        .backdrop {
          background: #eaeff7 !important;
        }
      }
    `,
  ];

  static properties = {
    magicLink: {type: Boolean},
    log: {type: Boolean},
    passReq: {type: Boolean},
    attemptSubmit: {type: Boolean},
    loading: {type: Boolean},
    done: {type: Boolean},
    _handleSubmit: {type: Function},
  };

  constructor() {
    super();
    this.log = true;
    this.passReq = false;
    this.loading = false;
    this.done = false;
    this.magicLink = true;
    /* Submit Function */
    this._handleSubmit = (e) => {
      const errorText = this.shadowRoot.querySelector('#error');
      const errorIcon = this.shadowRoot.querySelector('#error-icon');
      const inputFields = this.shadowRoot.querySelectorAll('input');
      const submitElement = e.submitter;
      if (!this.done) e.preventDefault();
      const validate = () => validation(inputFields, errorIcon, errorText);
      this.attemptSubmit = true;
      if (!submitElement.classList.contains('social-btn')) {
        validate();
      } else if (
        !validation(
          this.shadowRoot.querySelectorAll('#tos'),
          errorIcon,
          errorText
        )
      ) {
        this.loading = true;
        console.log(this.loading);
        setTimeout(() => {
          this.done = true;
          this.shadowRoot.querySelector('#login-form').submit();
        }, 2000);
      }
    };
  }

  render() {
    return html`
      <link rel="stylesheet" href="/dev/output.css" />
      <div
        class="w-full h-full bg-[#00000070] fixed top-0 left-0 right-0 bottom-0 z-30 flex justify-center items-center p-4 py-6"
      >
        <div
          class="overflow-y-scroll py-5 max-w-[28.5rem] max-h-[43.125rem] w-full h-full rounded-xl text-black pt-5 px-7 z-[5] font-sofia animate-fadeInAlt backdrop backdrop-filter backdrop-blur-3xl bg-[#ffffff90]"
        >
          <div class="flex flex-col text-center h-full gap-2 sm:gap-3 relative">
            <slot></slot>
            <section>
              <h2 class="text-[3.2rem] text-left font-bold leading-snug">
                ${this.log ? 'Sign in' : 'Sign up'}
              </h2>
              <p class="font-semibold text-left text-[17px]">
                ${!this.log
                  ? 'Earn 1000 ekstrapoints by signing up'
                  : 'Sign in for your daily bonus!'}
              </p>
            </section>
            <form
              @submit="${(e) => this._handleSubmit(e)}"
              id="login-form"
              method="POST"
              action="/"
              class="flex flex-col h-full gap-1 items-center"
            >
              <div class="flex flex-col gap-3 mt-4 w-full">
                <button
                  type="submit"
                  class="social-btn w-full flex rounded-lg p-[0.9rem] justify-center items-center bg-[#ffffff80]"
                >
                  <div
                    class="w-6 h-6 bg-lightBlue p-1 rounded-md flex justify-center items-center"
                  >
                    <img
                      src="./images/social-icons/facebook.svg"
                      class="h-full"
                    />
                  </div>
                  <p class="mx-auto pr-5 pb-1">Continue with Facebook</p>
                </button>
                <button
                  type="submit"
                  class="social-btn w-full flex rounded-lg p-3 justify-center items-center bg-[#ffffff80]"
                >
                  <div
                    class="w-6 h-6 bg-lightBlue p-1 rounded-md flex justify-center items-center"
                  >
                    <img
                      src="./images/social-icons/google.svg"
                      class="h-full"
                    />
                  </div>
                  <p class="mx-auto pr-5 pb-1">Continue with Google</p>
                </button>
                <button
                  type="submit"
                  class="social-btn w-full flex rounded-lg p-3 justify-center items-center bg-[#ffffff80]"
                >
                  <div
                    class="w-6 h-6 bg-lightBlue p-1 rounded-md flex justify-center items-center"
                  >
                    <img src="./images/social-icons/apple.svg" class="h-full" />
                  </div>
                  <p class="mx-auto pr-5 pb-1">Continue with Apple</p>
                </button>
              </div>
              <p class="text-black my-2 font-medium">Or</p>
              <div class="flex flex-col items-center gap-2 relative w-full">
                <p
                  id="error"
                  class="text-red text-xs absolute top-[-1.3rem] hidden animate-fadeInAlt opacity-0 self-start"
                ></p>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  class="pb-1 px-3 h-12 w-full rounded-lg bg-lightGray border-2 border-transparent transition-colors placeholder:text-inherit"
                />
                ${!this.passReq && !this.magicLink
                  ? html`
                      <input
                        type="password"
                        placeholder="Password..."
                        id="password"
                        name="password"
                        class="pb-1 px-3 h-12 w-full rounded-lg bg-lightGray border-2 border-transparent transition-colors placeholder:text-inherit"
                      />
                    `
                  : ``}
                ${!this.log
                  ? html`
                      <div
                        class="flex gap-3 items-center justify-center w-full px-5"
                      >
                        <div class="relative w-4 h-4">
                          <input
                            class="tos-checkbox cursor-pointer appearance-none min-w-[1rem] min-h-[1rem] border-darkBlue before:rounded-[4px] relative before:border-2 before:absolute before:w-full before:h-full before:overflow-hidden before:border-inherit"
                            type="checkbox"
                            name="tos"
                            id="tos"
                          />
                          <img
                            id="error-icon"
                            class="absolute -top-[1.2rem] w-3 left-[calc(50%-(12px/2))] hidden animate-fadeInAlt opacity-0"
                            src="./images/error.svg"
                            alt="Error"
                          />
                        </div>
                        <label
                          for="tos"
                          class="text-xs text-darkBlue text-left"
                        >
                          By selecting to login via Social I agree to the<br />
                          <a href="#" class="text-blue font-bold"
                            >Terms & Conditions and Privacy Policy</a
                          >
                        </label>
                      </div>
                    `
                  : ``}
              </div>
              <button
                type="submit"
                id="submit-button"
                class="mt-4 rounded-md cursor-pointer shadow-md px-4 pb-1 h-12 w-full flex justify-center items-center text-lg font-medium text-white md:hover:scale-105 transition-transform active:scale-100 bg-gradient-to-bl from-orange to-yellow"
              >
                ${this.magicLink && !this.passReq && !this.loading
                  ? html`<img
                      class="-translate-x-3 h-1/2"
                      src="./images/wand.svg"
                    />`
                  : ``}
                ${!this.loading
                  ? `${
                      this.log && !this.passReq && !this.magicLink
                        ? 'Sign in'
                        : this.log && this.passReq
                        ? 'Send Recovery Mail'
                        : this.magicLink
                        ? 'Send link to email'
                        : 'Continue'
                    }`
                  : html`<img
                      class="animate-rotate h-4/5"
                      src="./images/arrows_circle.svg"
                      alt="Loading icon"
                    />`}
              </button>
              ${!this.passReq
                ? html`
                    <button
                      class="flex gap-1 items-center text-sm"
                      @click=${() => {
                        this.magicLink = !this.magicLink;
                        console.log(this.magicLink);
                      }}
                      type="button"
                    >
                      ${!this.magicLink
                        ? html`<img src="./images/wand-black.svg" />`
                        : ``}
                      ${!this.magicLink && this.log
                        ? html`Sign in
                            <span class="font-semibold underline"
                              >without a password</span
                            >`
                        : !this.magicLink && !this.log
                        ? html`Sign up
                            <span class="font-semibold underline"
                              >without a password</span
                            >`
                        : this.magicLink && this.log
                        ? html`Sign in
                            <span class="font-semibold underline"
                              >with your password</span
                            >`
                        : html`Sign up
                            <span class="font-semibold underline"
                              >with your password</span
                            >`}
                    </button>
                  `
                : ``}
            </form>
            <div class="leading-4 flex gap-1 mx-auto">
              <p class="text-base">
                ${!this.log ? 'Already member?' : 'Not a member?'}
              </p>
              <button
                type="button"
                class="text-base font-bold underline"
                @click=${() => {
                  if (this.passReq) this.passReq = false;
                  if (this.magicLink) this.magicLink = true;
                  this.log = !this.log;
                  const inputFields = this.shadowRoot.querySelectorAll('input');
                  const errorText = this.shadowRoot.querySelector('#error');
                  inputFields.forEach((elm) => resetErrorStyle(elm, errorText));
                }}
              >
                ${!this.log ? 'Sign in here' : 'Sign up here'}
              </button>
            </div>
            ${this.log
              ? html`<button
                  class="text-lg font-semibold"
                  @click=${() => {
                    this.passReq = !this.passReq;
                    const inputFields =
                      this.shadowRoot.querySelectorAll('input');
                    const errorText = this.shadowRoot.querySelector('#error');
                    inputFields.forEach((elm) =>
                      resetErrorStyle(elm, errorText)
                    );
                  }}
                >
                  ${!this.passReq
                    ? 'Forgot your password?'
                    : 'Remember your password?'}
                </button>`
              : ``}
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('log-in', Login);
