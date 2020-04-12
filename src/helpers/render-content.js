export default function (arr, template) {
  let res = '';
  const array = arr || [];
  array.forEach((item) => {
    res += template(item);
  });

  return res;
}
