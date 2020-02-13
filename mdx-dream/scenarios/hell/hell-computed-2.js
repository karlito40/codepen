computed: {
  chiotteToUse () {
    if (this.doNotUseChiotte) return;

    return this.availableChiottes?.[0];
  },

  myChiotte () {
    return hasPermission('to.chier') && !this.ongoingWar && this.chiotteToUse;
  },

  justUseThisChiotte () {
    return iDontHaveTimeToReadYour600LinesOfShit;
  },
}
