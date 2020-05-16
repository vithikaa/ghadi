export function setWindowFocus (context, focus) {
  context.commit('setFocus', focus)
}

export function setWindowSize (context, size) {
  context.commit('setSize', size)
}