const style = {
  width: 200,
  backgroundColor: 'white',
  borderRadius: 10,
  borderColor: 'gray',
  borderWidth: 1,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 50
}

export function PostComponent({ name, subtitle, image, time, discription }) {
  return (
    <div style={style}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={image} style={{ width: 55, height: 55, borderRadius: '50%' }} />

        <div style={{ marginLeft: 20 }}>
          <div style={{ fontSize: 15 }}>
            <b>{name}</b>
          </div>
          <div>{subtitle}</div>
          {time !== undefined ? (
            <div>
              {time}. <span style={{ fontSize: 10 }}>🌐</span>
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 16 }}>{discription}</div>
    </div>
  )
}

