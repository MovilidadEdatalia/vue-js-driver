import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

const install = function (Vue, options = {}) {
  let vueJsDriver = {};

  // Función para inicializar Driver.js
  function initDriver(options, onFinish) {
    const driverOptions = {
      className: options.className || 'vue-js-driver',
      allowClose: false,
      prevBtnText: '上一步',
      nextBtnText: '下一步',
      closeBtnText: '关闭',
      doneBtnText: '完成',
      ...options,
      onReset: () => {
        if (typeof options.onReset === 'function') {
          options.onReset();
        }
        if (onFinish) {
          onFinish();  // Llamar al callback cuando el tour termina
        }
      },
      onClose: () => {
        if (onFinish) {
          onFinish();  // Llamar al callback cuando el tour se cierra
        }
      }
    };
    vueJsDriver.driverInstance = new Driver(driverOptions);
  }

  /**
   * Función para abrir el tour
   * @param { Array } steps - Los pasos del tour
   * @param { Number } index - El índice de paso inicial
   * @param { Function } onFinish - Callback para ejecutar cuando el tour termine
   * @public
   */
  function showDriver(steps = [], index = 0, onFinish = null) {
    if (!steps.length) {
      return;
    }

    // Inicializar Driver.js y pasar el callback
    initDriver(options, onFinish);

    // Definir los pasos y comenzar el tour
    vueJsDriver.driverInstance.defineSteps(steps);
    vueJsDriver.driverInstance.start(index);
  }

  // Asignar la función showDriver al objeto vueJsDriver
  vueJsDriver.showDriver = showDriver;

  vueJsDriver.stopDriver = () => {
    console.log(vueJsDriver.driverInstance);
    if (vueJsDriver.driverInstance) {
      vueJsDriver.driverInstance.reset(true);  // O reset()
    }
  };

  // Añadir vueJsDriver al prototipo de Vue
  Vue.prototype.$vueJsDriver = vueJsDriver;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};

