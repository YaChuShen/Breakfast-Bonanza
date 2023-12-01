const onDragEnter = (data, status, haveOverCook, list, setCookedGroup) => {
  if (!status && !haveOverCook) {
    setCookedGroup(list.find((e) => e.init.value === data.targetItem));
  }
};

export default onDragEnter;
