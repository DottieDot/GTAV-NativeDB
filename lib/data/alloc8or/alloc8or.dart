import 'dart:convert';
import 'dart:async';
import 'package:gtav_nativedb/data/alloc8or/model.dart';
import 'package:gtav_nativedb/model/native.dart';
import 'package:http/http.dart' as http;

class Alloc8or {
  static Future<List<Native>> fetchNativeData() async {
    final response = await http.get(Uri.https('raw.githubusercontent.com',
        '/alloc8or/gta5-nativedb-data/master/natives.json'));

    if (response.statusCode == 200) {
      final values = json.decode(response.body) as Map<String, dynamic>;
      final namespaces = values.cast<String, Map<String, dynamic>>().map(
          (key, value) => MapEntry(
              key,
              value.map((key, value) =>
                  MapEntry(key, Alloc8orNative.fromJson((value))))));
      final natives = namespaces.entries
          .expand((element) => element.value.entries)
          .toList();

      final List<Native> result = [];
      for (final data in natives) {
        result.add(data.value.toNative(data.key));
      }
      return result;
    } else {
      throw Exception("!");
    }
  }
}
