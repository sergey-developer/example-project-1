import { useEffect, useState } from 'react';

let cachedScripts: any = [];
let loadingScripts: any = [];
export function useScript(src: string) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false
        });
      } else {
        let script: any;

        // Create script only if one is not being loaded
        if (loadingScripts[src]) {
          script = loadingScripts[src];
        } else {
          script = document.createElement('script');
          script.src = src;
          script.async = true;

          // Add script to loadingScripts
          loadingScripts[src] = script;

          // Add script to document body
          document.body.appendChild(script);
        }

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          // Add script to cachedScripts
          cachedScripts[src] = script;

          // Remove from loadingScripts
          delete loadingScripts[src];

          setState({
            loaded: true,
            error: false
          });
        };

        const onScriptError = () => {
          // Remove from loadingScripts we can try loading again
          delete loadingScripts[src];
          script.remove();

          setState({
            loaded: true,
            error: true
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        // and remove script from loadingScripts if not yet loaded
        return () => {
          // Remove from loadingScripts
          delete loadingScripts[src];

          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
