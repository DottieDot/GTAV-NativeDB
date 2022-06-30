class NativeParam {
  final String type;

  final String name;

  NativeParam(this.type, this.name);
}

class Native {
  final String name;

  final String hash;

  final String? jhash;

  final String comment;

  final List<NativeParam> params;

  final String returnType;

  final String build;

  final List<String> oldNames;

  Native(this.name, this.hash, this.jhash, this.comment, this.params,
      this.returnType, this.build, this.oldNames);
}
