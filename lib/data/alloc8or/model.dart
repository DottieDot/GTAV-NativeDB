import 'package:gtav_nativedb/model/native.dart';
import 'package:json_annotation/json_annotation.dart';

part 'model.g.dart';

@JsonSerializable()
class Alloc8orNativeParam {
  final String type;

  final String name;

  Alloc8orNativeParam({required this.type, required this.name});

  factory Alloc8orNativeParam.fromJson(Map<String, dynamic> json) =>
      _$Alloc8orNativeParamFromJson(json);

  Map<String, dynamic> toJson() => _$Alloc8orNativeParamToJson(this);

  NativeParam toNativeParam() {
    return NativeParam(type, name);
  }
}

@JsonSerializable()
class Alloc8orNative {
  final String name;

  final String? jhash;

  final String comment;

  final List<Alloc8orNativeParam> params;

  @JsonKey(name: 'return_type')
  final String returnType;

  final String build;

  @JsonKey(name: 'old_names')
  final List<String>? oldNames;

  Alloc8orNative(
      {required this.name,
      this.jhash,
      required this.comment,
      required this.params,
      required this.returnType,
      required this.build,
      this.oldNames});

  factory Alloc8orNative.fromJson(Map<String, dynamic> json) =>
      _$Alloc8orNativeFromJson(json);

  Map<String, dynamic> toJson() => _$Alloc8orNativeToJson(this);

  Native toNative(String hash) {
    final params = this.params.map((param) => param.toNativeParam()).toList();
    return Native(name, hash, jhash, comment, params, returnType, build,
        oldNames ?? List.empty());
  }
}

@JsonSerializable()
class Alloc8orNamespace {
  final Map<String, Alloc8orNative> natives;

  Alloc8orNamespace({required this.natives});

  factory Alloc8orNamespace.fromJson(Map<String, dynamic> json) =>
      _$Alloc8orNamespaceFromJson(json);

  Map<String, dynamic> toJson() => _$Alloc8orNamespaceToJson(this);
}
