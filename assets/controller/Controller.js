
// SW Controller
class controller {
	showUI(index,msg){
		index.innerHTML = `
		<div class="box_of_UI">
		  <h1>${msg}</h1>
		  <input class="btn" id="ok" type="button" value="Update">
		  <input class="btn" id="no" type="button" value="Cansel">

		  <p style="font-size:10pt;font-weight:normal">Note there's a new version of this website.<br> Press the Update button to upgrade/to experience the newer version</p>
		  </div>`;
		return index;
	}
}