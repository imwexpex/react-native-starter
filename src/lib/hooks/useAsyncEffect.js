import React from 'react';

function useAsyncEffect(effect, destroy, inputs) {
  const hasDestroy = typeof destroy === 'function';

  React.useEffect(
    function () {
      let result;
      let mounted = true;
      const maybePromise = effect(function () {
        return mounted;
      });

      Promise.resolve(maybePromise).then(function (value) {
        result = value;
      });

      return function () {
        mounted = false;

        if (hasDestroy) {
          destroy(result);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hasDestroy ? inputs : destroy,
  );
}

module.exports = useAsyncEffect;
module.exports.useAsyncEffect = useAsyncEffect;
