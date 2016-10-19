/*jshint node:true*/
module.exports = {
  description: 'Installs Parse as bower dependency',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    return this.addBowerPackageToProject('parse');
  }
};
