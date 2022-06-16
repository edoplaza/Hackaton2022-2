const Sidebar = () => {

  return (
    <div className="Sidebar" data-testid="Sidebar">
      <button id="bars-layer" className="Sidebar__button Sidebar__button--on">Bars</button>
      <button id="clubs-layer" className="Sidebar__button Sidebar__button--on">Strip Clubs</button>
      <button id="cemeteries-layer" className="Sidebar__button Sidebar__button--on">Cemeteries</button>
      <button id="designers-layer" className="Sidebar__button Sidebar__button--on">Designers</button>
      <button id="reset" className="reset__button">Reset Map</button>
    </div>
  )
}

export default Sidebar