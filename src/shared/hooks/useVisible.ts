import { useCallback, useState } from 'react';

type UseVisibilityStateReturnType = [
  boolean,
  () => void,
  () => void,
  (value?: boolean) => void
];

const useVisible = (initialValue: boolean = false): UseVisibilityStateReturnType => {
  const [showed, setShow] = useState(initialValue);

  const show = useCallback(() => {
    setShow(true);
  }, []);

  const hide = useCallback(() => {
    setShow(false);
  }, []);

  const toggle = useCallback((value?: boolean) => {
    value === undefined ? setShow(prev => !prev) : setShow(value);
  }, []);

  return [showed, show, hide, toggle];
};

export default useVisible;
