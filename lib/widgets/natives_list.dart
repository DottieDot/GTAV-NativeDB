import 'package:flutter/material.dart';
import 'package:flutter_sticky_header/flutter_sticky_header.dart';
import 'package:gtav_nativedb/data/alloc8or/alloc8or.dart';
import 'package:gtav_nativedb/model/native.dart';

class _NativesListState extends State<NativesList> {
  late Future<List<Native>> nativesFuture;

  @override
  void initState() {
    super.initState();
    nativesFuture = Alloc8or.fetchNativeData();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: nativesFuture,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final data = snapshot.data! as List<Native>;
            return CustomScrollView(
              shrinkWrap: true,
              scrollDirection: Axis.vertical,
              slivers: [
                SliverStickyHeader.builder(
                  builder: (context, state) => Container(
                    height: 60.0,
                    color: (state.isPinned ? Colors.pink : Colors.lightBlue)
                        .withOpacity(1.0 - state.scrollPercentage),
                    padding: EdgeInsets.symmetric(horizontal: 16.0),
                    alignment: Alignment.centerLeft,
                    child: const Text(
                      'Header #1',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, i) => ListTile(
                        title: Text('List tile #$i'),
                      ),
                      childCount: data.length,
                    ),
                  ),
                ),
              ],
            );
          } else if (snapshot.hasError) {
            return Text('${snapshot.error}');
          }

          return const CircularProgressIndicator();
        });
  }
}

class NativesList extends StatefulWidget {
  const NativesList({Key? key}) : super(key: key);

  @override
  _NativesListState createState() => _NativesListState();
}
