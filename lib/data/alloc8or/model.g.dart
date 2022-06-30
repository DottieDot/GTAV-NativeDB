// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Alloc8orNativeParam _$Alloc8orNativeParamFromJson(Map<String, dynamic> json) =>
    Alloc8orNativeParam(
      type: json['type'] as String,
      name: json['name'] as String,
    );

Map<String, dynamic> _$Alloc8orNativeParamToJson(
        Alloc8orNativeParam instance) =>
    <String, dynamic>{
      'type': instance.type,
      'name': instance.name,
    };

Alloc8orNative _$Alloc8orNativeFromJson(Map<String, dynamic> json) =>
    Alloc8orNative(
      name: json['name'] as String,
      jhash: json['jhash'] as String?,
      comment: json['comment'] as String,
      params: (json['params'] as List<dynamic>)
          .map((e) => Alloc8orNativeParam.fromJson(e as Map<String, dynamic>))
          .toList(),
      returnType: json['return_type'] as String,
      build: json['build'] as String,
      oldNames: (json['old_names'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$Alloc8orNativeToJson(Alloc8orNative instance) =>
    <String, dynamic>{
      'name': instance.name,
      'jhash': instance.jhash,
      'comment': instance.comment,
      'params': instance.params,
      'return_type': instance.returnType,
      'build': instance.build,
      'old_names': instance.oldNames,
    };

Alloc8orNamespace _$Alloc8orNamespaceFromJson(Map<String, dynamic> json) =>
    Alloc8orNamespace(
      natives: (json['natives'] as Map<String, dynamic>).map(
        (k, e) =>
            MapEntry(k, Alloc8orNative.fromJson(e as Map<String, dynamic>)),
      ),
    );

Map<String, dynamic> _$Alloc8orNamespaceToJson(Alloc8orNamespace instance) =>
    <String, dynamic>{
      'natives': instance.natives,
    };
