import * as PIXI from 'pixi.js-legacy'
import EventEmitter from 'events'
import TextureService from './texture'

class Star extends EventEmitter {

  static currentId = 0

  constructor (app, location, fullStar, coloursValues, shapes) {
    super()

    this.id = Star.currentId
    Star.currentId += 1

    this.location = location
    this.infrastructure = {
      economy: 0,
      industry: 0,
      science: 0,
    }
    this.warpGate = false
    this.homeStar = false
    this.playerId = null
    this.specialistId = null
    this.isNebula = false
    this.isAsteroidField = false

    let nr = Math.round(Math.random()*50)
    this.naturalResources = {
      economy: nr,
      industry: nr,
      science: nr,
    }

    if(fullStar) {
      this.id = fullStar.id
      Star.currentId = fullStar.id+1
      this.location = fullStar.location
      this.warpGate = fullStar.warpGate
      this.homeStar = fullStar.homeStar
      this.playerId = fullStar.playerId
      this.specialistId = fullStar.specialistId
      this.naturalResources = fullStar.naturalResources
      if( fullStar.infrastructure ) {
        this.infrastructure = fullStar.infrastructure
      }
      this.isNebula = fullStar.isNebula
      this.isAsteroidField = fullStar.isAsteroidField
    }

    this.app = app
    this.container = new PIXI.Container()
    this.container.position.x = location.x
    this.container.position.y = location.y
    this.container.interactive = true
    //this.container.interactiveChildren = false
    this.container.buttonMode = true
    this.container.hitArea = new PIXI.Circle(0, 0, 32)
    this.baseScale = 1.0/4.0

    this.container.on('pointerup', this.onClicked.bind(this))
    this.container.on('mouseover', this.onMouseOver.bind(this))
    this.container.on('mouseout', this.onMouseOut.bind(this))

    this.player = {}
    this._updatePlayer(coloursValues, shapes)

    this._updateGraphics()
  }

  updatePosition() {
    this.container.position.x = this.location.x
    this.container.position.y = this.location.y
  }

  _updatePlayer(colours, shapes) {
    if(!this.playerId) {return}
    if(this.playerId === -1) { return }
    this.player.colour = colours[this.playerId%8]
    this.player.shape = shapes[Math.floor(this.playerId/8)]
  }

  _updateGraphics() {
    if( this.homeStar ) {
      this.container.scale.x = 2.0*this.baseScale
      this.container.scale.y = 2.0*this.baseScale
    }
    else {
      this.container.scale.x = 1.0*this.baseScale
      this.container.scale.y = 1.0*this.baseScale
    }
    this._updateStarSprite()
    this._updateWarpGateGeometry()
    this._updatePlayerGeometry()
    this._updateInfrastructureText()
    this._updateNaturalResourcesText()
    this._updateSpecialistSprite()
    this._updateNebulaSprite()
    this._updateAsteroidFieldSprite()
  }

  _updatePlayerGeometry() {
    if( this.playerGeometry ) {
      this.container.removeChild(this.playerGeometry)
    }
    if( this.playerIndex === -1 ) { return }

    this.playerGeometry = new PIXI.Graphics()
    this.playerGeometry.lineStyle(1.0, this.player.colour, 1.0)

    switch (this.player.shape) {
      case 'circle':
        this._drawCircleGeometry()
        break
      case 'square':
        this._drawSquareGeometry()
        break
      case 'diamond':
        this._drawDiamondGeometry()
        break
      case 'hexagon':
        this._drawHexagonGeometry()
        break
    }

    this.playerGeometry.scale.x = 3.0
    this.playerGeometry.scale.y = 3.0
    this.container.addChild(this.playerGeometry)
  }

  _drawCircleGeometry() {
    this.playerGeometry.drawCircle(0,0,8)
  }
  _drawSquareGeometry() {
    this.playerGeometry.drawRect(-8,-8,16,16)
  }
  _drawDiamondGeometry() {
    let s = 9;

    this.playerGeometry.moveTo(0, -s)
    this.playerGeometry.lineTo(-s, 0)
    this.playerGeometry.lineTo(0, s)
    this.playerGeometry.lineTo(s, 0)
    this.playerGeometry.closePath()
  }
  _drawHexagonGeometry() {
    this.playerGeometry.moveTo(4, -7)
    this.playerGeometry.lineTo(-4, -7)
    this.playerGeometry.lineTo(-8, 0)
    this.playerGeometry.lineTo(-4, 7)
    this.playerGeometry.lineTo(4, 7)
    this.playerGeometry.lineTo(8, 0)
    this.playerGeometry.closePath()
  }

  _updateSpecialistSprite() {
    //TODO swap sprite texture instead
    if( this.specialist_sprite ) {
      this.container.removeChild(this.specialist_sprite)
      this.specialist_sprite.destroy()
      this.specialist_sprite = null
    }
    if(this.specialistId === -1) { return }

    let specialistTexture = TextureService.getSpecialistTexture(this.specialistId, false)
    this.specialist_sprite = new PIXI.Sprite(specialistTexture)
    this.specialist_sprite.width = 32
    this.specialist_sprite.height = 32
    this.specialist_sprite.position.x = -16
    this.specialist_sprite.position.y = -16
    this.container.addChild(this.specialist_sprite)
  }

  _updateNebulaSprite() {
    if( this.nebulaSprite ) {
      this.container.removeChild(this.nebulaSprite)
      this.nebulaSprite.destroy()
      this.nebulaSprite = null
    }
    if( this.isNebula ) {
      let nebulaTexture = TextureService.STAR_MODIFIERS['nebula']
      this.nebulaSprite = new PIXI.Sprite(nebulaTexture)
      this.nebulaSprite.anchor.set(0.5)
      this.nebulaSprite.width = 64
      this.nebulaSprite.height = 64
      this.container.addChild(this.nebulaSprite)
    }
  }

  _updateAsteroidFieldSprite() {
    if( this.asteroidFieldSprite ) {
      this.container.removeChild(this.asteroidFieldSprite)
      this.asteroidFieldSprite.destroy()
      this.asteroidFieldSprite = null
    }
    if( this.isAsteroidField ) {
      let asteroidFieldTexture = TextureService.STAR_MODIFIERS['asteroids']
      this.asteroidFieldSprite = new PIXI.Sprite(asteroidFieldTexture)
      this.asteroidFieldSprite.anchor.set(0.5)
      this.container.addChild(this.asteroidFieldSprite)
    }
  }

  _updateWarpGateGeometry() {
    //TODO use graphics.clear
    if( this.warpGate_geometry ) {
      this.container.removeChild(this.warpGate_geometry)
    }
    if( this.warpGate ) {
      this.warpGate_geometry = new PIXI.Graphics()
      this.warpGate_geometry.lineStyle(2, 0xffffff, 1.0)
      this.warpGate_geometry.drawCircle(0, 0, 32)
      this.container.addChild(this.warpGate_geometry)
    }
  }

  _updateStarSprite() {
    if( this.specialistId ) { return }
    if( this.star_sprite ) {
      this.container.removeChild(this.star_sprite)
    }
    this.star_sprite = new PIXI.Sprite(TextureService.STAR_SYMBOLS['scannable'])
    this.star_sprite.anchor.set(0.5)
    this.star_sprite.width = 12.0
    this.star_sprite.height = 12.0
    this.container.addChild(this.star_sprite)
  }

  _updateNaturalResourcesText() {
    //TODO use bitmap text, change text without creating another object
    if( this.naturalResources_text ) {
      this.container.removeChild(this.naturalResources_text)
    }
    this.naturalResources_text = new PIXI.Text(`${this.naturalResources.economy} ${this.naturalResources.industry} ${this.naturalResources.science}`, {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'})
    this.naturalResources_text.position.x = -(this.naturalResources_text.width/2.0)
    this.naturalResources_text.position.y = 16
    this.container.addChild(this.naturalResources_text)
  }

  _updateInfrastructureText() {
    //TODO use bitmap text, ignore if 0, change text without creating another object
    if( this.infrastructure_text ) {
      this.container.removeChild(this.infrastructure_text)
    }
    this.infrastructure_text = new PIXI.Text(`${this.infrastructure.economy} ${this.infrastructure.industry} ${this.infrastructure.science}`, {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center'})
    this.infrastructure_text.position.x = (-this.infrastructure_text.width/2.0)
    this.infrastructure_text.position.y = -16-(this.infrastructure_text.height)
    this.container.addChild(this.infrastructure_text)
  }

  onClicked (e) {
    this.emit('onStarClicked', {
      star: this,
      e,
    })
  }

  update(colours, shapes) {
    this._updatePlayer(colours,shapes)
    this._updateGraphics()
  }

  onMouseOver (e) {
		e = null
		if (e) {console.log()}
    this.emit('onStarMouseOver', this)
  }

  onMouseOut (e) {
		e = null
		if (e) {console.log()}
    this.emit('onStarMouseOut', this)
  }

  destroy () {
    this.container.destroy()
  }

  toJSON() {
    return( {
      id: this.id,
      location: this.location,
      naturalResources: this.naturalResources,
      //infrastructure: this.infrastructure,
      warpGate: this.warpGate,
      homeStar: this.homeStar,
      isNebula: this.isNebula,
      isAsteroidField: this.isAsteroidField,
      playerId: (this.playerId >= 0 ? this.playerId : null) ,
      specialistId: this.specialistId >= 0 ? this.specialistId : null
    })
  }

}

export default Star
