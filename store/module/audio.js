export default{
	state:{
		eventBus:[],
		Record:null,
		
		RecordStart:null,
		RecordEnd:null,
		RecordTime:0,
		RecordTimer:null,
		sendEvent:null,
		pause:false
	},
	mutations:{
		clearTimer(state) {
			clearInterval(state.RecordTimer)
			state.RecordTime = 0
		},
		changePause(state,data) {
			state.pause = data
		},
		regSend(state,data) {
			state.sendEvent = data
		},
		startRecord(state) {
				
				
				state.Record.onStart(()=>{
					this.commit('changePause',false)
					state.RecordTimer = setInterval(()=>{
						state.RecordTime++	
					
					},1000)
				})
				console.log('监听')
				state.Record.onStop((e)=>{
					console.log('结束的e',e)
						// console.log(state.pause,'pause')
						if(!state.pause) 
						state.sendEvent(e.tempFilePath)
						
				})
			
		},
		initRecord(state,event) {
			 state.Record = uni.getRecorderManager()
		},
		
		registerEvent(state,event) {
			console.log('我在注册')
			state.eventBus.push(event)
		},
		doEvent(state,data) {
			state.eventBus.forEach(v=>v(data))
		},
		removeEvent(state,event) {
			let index = state.eventBus.findIndex(v=>v === event)
			if(index !== -1) {
				state.eventBus.splice(index,1)
			}
		}
	},
	actions:{
		onAudio({commit},event){
			commit('registerEvent',event)
		},
		executeAudio({commit},data){
			commit('doEvent',data)
		},
		offAudio({commit},event){
			commit('removeEvent',event)
		}
	}
}