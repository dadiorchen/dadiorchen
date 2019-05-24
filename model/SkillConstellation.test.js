//@flow
import SkillConstellation from './SkillConstellation.js'
import React		from 'react'
import THREE		from '../three.js'

/*
 * to mock three.js to let it run on Node/Jest env
 */
THREE.WebGLRenderer		= () => ({
	setPixelRatio		: jest.fn(),
	setSize		: jest.fn(),
	domElement		: document.createElement('div'),
	render		: jest.fn(),
})

THREE.CSS3DRenderer		= () => ({
	setSize		: jest.fn(),
	render		: jest.fn(),
	domElement		: document.createElement('div'),
})

describe('?', () => {
	/*
	 * A fake DOM element
	 */
	let elementDOM		
	let setting
	beforeAll(() => {
		elementDOM		= document.createElement('div')
		setting		= {
			container		: elementDOM,
			textCSS		: (text) => {
				return (
					<div
					style={{
						color		: 'red',
					}}
					>
					{text}
					</div>
				)
			},
			data		: [
				{
					name		: 'Javascript',
					weight		: 8,
				}
			]
		}
	})
	
	it('?', (done) => {
		/*
		 * create
		 */
		const skillConstellation		= new SkillConstellation(setting)
		skillConstellation.init()
			.then(() => {
				/*
				 * to render the first tick
				 */
				skillConstellation.render()
				/*
				 * after render, the nodes should have been placed somewhere in the 3D
				 * space
				 */
				//console.log(skillConstellation.nodes)
				expect(skillConstellation.nodes[0].object).toBeDefined()
			})
			.then(() => {
				done()
			})
	})

	describe('setting.cameraType === perspective', () => {
		beforeAll(() => {
			//$FlowFixMe
			setting.cameraType		= 'perspective'
		})

		it('', (done) => {
			const skillConstellation		= new SkillConstellation(setting)
			skillConstellation.init()
				.then(() => {
					skillConstellation.render()
				})
				.then(() => {
					done()
				})
		})
	})
})
