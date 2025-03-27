<template>
  <view>
    <canvas id="myCanvas" style="width: 100vw; height: 100vh"></canvas>
	<button @click="prevPage">上一页</button>
	<button @click="nextPage">下一页</button>
  </view>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist';	
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
	
export default {
  data() {
    return {
	  pdfPath: "/static/terms.pdf",
	  loadingTask: null,
	  canvasContext: null,
	  pdf: null,
	  currentPage: 1,
	  totalPages: 0,
	  scale: 1.5,
	  dpr: window.devicePixelRatio || 1,	  
	}
  },
  mounted() {
	this.$nextTick(() => {  
	  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs';  
      this.loadPdf();	
    })
  },
  beforeUnmount() {
      // 清理资源
	if (this.loadingTask) {
	  this.loadingTask.destroy();
	}
  }, 
  
  methods: {
    async loadPdf() {
	  try {	
	    const loadingTask = pdfjsLib.getDocument( this.pdfPath );
	    const pdf = await loadingTask.promise;
	    //const page = await pdf.getPage(1);
		this.pdf = pdf;
		this.totalPages = this.pdf.numPages;
		this.renderPage(this.currentPage);
	  } catch (error) {
	    console.error('Error loading PDF:', error);
	  }
    },
    async renderPage(pageNumber){
	  try{
		const page = await this.pdf.getPage(pageNumber);
		const viewport = page.getViewport({ scale: this.scale });  
		// console.log('Page object:', page);
		
	 //    const scale = 1.5;
	 //    const viewport = page.getViewport({ scale });
		// const dpr = window.devicePixelRatio || 1;
		
		// console.log('Viewport object:', viewport);
		
		const canvas = uni.createSelectorQuery().select('#myCanvas');
		canvas.fields({ node: true,size: true }).exec(res => {
		  // const canvasWidth = res[0].width;
		  // const canvasHeight = res[0].height;
		  
			if (res && res[0] && res[0].node) {
			  
			  const canvasNode = res[0].node;
			  const canvasWidth = res[0].width;
			  const canvasHeight = res[0].height;
			  
			  const context = canvasNode.getContext('2d');
			
			  // const context = uni.createCanvasContext('myCanvas');
				
			  console.log('Canvas context:', context);	
						
		   //    context.canvas.width = viewport.width;
			  // context.canvas.height = viewport.height;
			  canvasNode.width = viewport.width * this.dpr;
			  canvasNode.height = viewport.height * this.dpr;
			  canvasNode.style.width = `${viewport.width}px`;
			  canvasNode.style.height = `${viewport.height}px`;
			

			  const renderContext = {
				canvasContext: context,
				viewport: viewport,
				transform: [this.dpr, 0, 0, this.dpr, 0, 0], // 解决字体错位问题
			  };
			  page.render(renderContext).promise.then(() => {
				console.log('PDF rendered successfully');
			  }).catch(error => {
				console.error('Error rendering PDF:', error);
			  });				
			} 					    
		})
	  } catch (error) {
		console.error('Error loading or rendering PDF:', error);
	  }		  
	},
	nextPage() {
      if (this.currentPage < this.totalPages) {
	    this.currentPage++;
	    this.renderPage(this.currentPage);
      }
    },
	prevPage() {
	  if (this.currentPage > 1) {
		this.currentPage--;
		this.renderPage(this.currentPage);
	  }
	},	  
  }
}
	
</script>

<style lang='scss'>

.view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100vw;
  
  canvas {
    border: 1px solid #000;
	width:100vw;
	height:100vh;
  }
  
  button{
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	width:100rpx;
	height:20rpx;
	font-size: 16rpx;
	background-color: azure;		
  }
  button:hover {
	background-color: #005bb5;
  }		 
}

</style>